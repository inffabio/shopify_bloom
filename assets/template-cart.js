(() => {
  const cartRoot = document.querySelector('[data-cart-root]');

  if (!cartRoot) {
    return;
  }

  const form = cartRoot.querySelector('[data-cart-form]');
  const feedback = cartRoot.querySelector('[data-cart-feedback]');
  const openCheckoutButton = cartRoot.querySelector('[data-cart-open-checkout]');
  const checkoutDrawer = document.querySelector('[data-cart-checkout-drawer]');
  const checkoutOverlay = document.querySelector('[data-cart-checkout-overlay]');
  const closeCheckoutButtons = Array.from(document.querySelectorAll('[data-cart-close-checkout]'));
  const moneyFormat = cartRoot.dataset.moneyFormat || '${{amount}}';
  const autoSyncDelayMs = 450;
  const drawerAnimationMs = 300;
  let quantitySyncTimer = null;
  let drawerHideTimer = null;

  const formatMoney = (cents) => {
    const amount = (Number(cents || 0) / 100).toFixed(2);
    const withThousands = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return moneyFormat
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, Math.round(Number(cents || 0) / 100).toString())
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, amount.replace(/\./g, ','))
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, Math.round(Number(cents || 0) / 100).toString().replace(/\./g, ','))
      .replace(/\{\{\s*amount\s*\}\}/g, withThousands);
  };

  const showFeedback = (message, tone) => {
    if (!feedback) {
      return;
    }

    feedback.textContent = message;
    feedback.className = 'mt-4 rounded-2xl border px-4 py-3 text-sm';
    feedback.classList.remove('hidden');

    if (tone === 'error') {
      feedback.classList.add('border-red-200', 'bg-red-50', 'text-red-700');
      return;
    }

    feedback.classList.add('border-emerald-200', 'bg-emerald-50', 'text-emerald-700');
  };

  const clearFeedback = () => {
    if (!feedback) {
      return;
    }

    feedback.textContent = '';
    feedback.className = 'mt-4 hidden rounded-2xl border px-4 py-3 text-sm';
  };

  const getRows = () => Array.from(cartRoot.querySelectorAll('[data-cart-item]'));

  const clampQuantity = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  const setButtonLoading = (button, loading) => {
    if (!button) {
      return;
    }

    const spinner = button.querySelector('[data-button-spinner]');
    const label = button.querySelector('[data-button-label]');

    if (loading) {
      button.dataset.wasDisabled = button.disabled ? 'true' : 'false';
      button.disabled = true;
      if (spinner) {
        spinner.classList.remove('hidden');
      }
      if (label) {
        label.classList.add('opacity-80');
      }
      return;
    }

    button.disabled = button.dataset.wasDisabled === 'true';
    if (spinner) {
      spinner.classList.add('hidden');
    }
    if (label) {
      label.classList.remove('opacity-80');
    }
  };

  const updateRowTotals = (row) => {
    const input = row.querySelector('[data-cart-quantity-input]');
    const decreaseButton = row.querySelector('[data-cart-quantity-trigger="decrease"]');
    const lineTotals = row.querySelectorAll('[data-cart-line-total]');
    const unitPrice = Number.parseInt(row.dataset.unitPrice || '0', 10);
    const quantity = clampQuantity(input.value);
    const lineTotal = unitPrice * quantity;

    input.value = quantity;
    lineTotals.forEach((element) => {
      element.textContent = formatMoney(lineTotal);
    });

    if (decreaseButton) {
      decreaseButton.disabled = quantity <= 1;
    }

    return {
      quantity,
      lineTotal,
    };
  };

  const recalculateCart = () => {
    let subtotal = 0;
    let itemCount = 0;

    getRows().forEach((row) => {
      const rowState = updateRowTotals(row);
      subtotal += rowState.lineTotal;
      itemCount += rowState.quantity;
    });

    cartRoot.querySelectorAll('[data-cart-subtotal]').forEach((element) => {
      element.textContent = formatMoney(subtotal);
    });

    cartRoot.querySelectorAll('[data-cart-total]').forEach((element) => {
      element.textContent = formatMoney(subtotal);
    });

    const itemCountElement = cartRoot.querySelector('[data-cart-item-count]');
    if (itemCountElement) {
      itemCountElement.textContent = `${itemCount} item${itemCount === 1 ? '' : 's'} selected`;
    }
  };

  const syncCartState = (cart) => {
    if (!cart || cart.item_count === 0) {
      window.location.reload();
      return;
    }

    const itemsByKey = new Map(cart.items.map((item) => [item.key, item]));

    getRows().forEach((row) => {
      const key = row.dataset.key;
      const item = itemsByKey.get(key);

      if (!item) {
        row.remove();
        return;
      }

      row.dataset.unitPrice = item.final_price;

      const input = row.querySelector('[data-cart-quantity-input]');
      if (input) {
        input.value = item.quantity;
      }

      const unitPriceElement = row.querySelector('[data-cart-unit-price]');
      if (unitPriceElement) {
        unitPriceElement.textContent = formatMoney(item.final_price);
      }

      row.querySelectorAll('[data-cart-line-total]').forEach((element) => {
        element.textContent = formatMoney(item.final_line_price);
      });
    });

    cartRoot.querySelectorAll('[data-cart-subtotal]').forEach((element) => {
      element.textContent = formatMoney(cart.total_price);
    });

    cartRoot.querySelectorAll('[data-cart-total]').forEach((element) => {
      element.textContent = formatMoney(cart.total_price);
    });

    const itemCountElement = cartRoot.querySelector('[data-cart-item-count]');
    if (itemCountElement) {
      itemCountElement.textContent = `${cart.item_count} item${cart.item_count === 1 ? '' : 's'} selected`;
    }

    getRows().forEach((row) => {
      updateRowTotals(row);
    });

    document.dispatchEvent(new CustomEvent('bloom:cart-updated', {
      detail: { cart },
    }));
  };

  const collectUpdates = () => {
    const updates = {};
    getRows().forEach((row) => {
      const input = row.querySelector('[data-cart-quantity-input]');
      updates[row.dataset.key] = clampQuantity(input ? input.value : 1);
    });
    return updates;
  };

  const syncQuantities = async () => {
    try {
      const cart = await postCartJson(`${window.Shopify.routes.root}cart/update.js`, {
        updates: collectUpdates(),
      });
      syncCartState(cart);
    } catch (error) {
      showFeedback('Could not update quantity right now.', 'error');
    }
  };

  const scheduleQuantitySync = () => {
    if (quantitySyncTimer) {
      window.clearTimeout(quantitySyncTimer);
    }

    quantitySyncTimer = window.setTimeout(() => {
      quantitySyncTimer = null;
      syncQuantities();
    }, autoSyncDelayMs);
  };

  const setBodyScrollLock = (lock) => {
    document.body.classList.toggle('overflow-hidden', lock);
    document.documentElement.classList.toggle('overflow-hidden', lock);
  };

  const openCheckoutDrawer = () => {
    if (!checkoutDrawer || !checkoutOverlay) {
      return;
    }

    if (drawerHideTimer) {
      window.clearTimeout(drawerHideTimer);
      drawerHideTimer = null;
    }

    setBodyScrollLock(true);
    checkoutDrawer.classList.remove('hidden', 'pointer-events-none');
    checkoutOverlay.classList.remove('hidden', 'pointer-events-none');

    window.requestAnimationFrame(() => {
      checkoutDrawer.classList.remove('translate-x-full');
      checkoutOverlay.classList.remove('opacity-0');
      checkoutOverlay.classList.add('opacity-100');
    });
  };

  const closeCheckoutDrawer = () => {
    if (!checkoutDrawer || !checkoutOverlay) {
      return;
    }

    if (drawerHideTimer) {
      window.clearTimeout(drawerHideTimer);
    }

    setBodyScrollLock(false);
    checkoutDrawer.classList.add('translate-x-full');
    checkoutOverlay.classList.remove('opacity-100');
    checkoutOverlay.classList.add('opacity-0');

    drawerHideTimer = window.setTimeout(() => {
      checkoutDrawer.classList.add('hidden', 'pointer-events-none');
      checkoutOverlay.classList.add('hidden', 'pointer-events-none');
      drawerHideTimer = null;
    }, drawerAnimationMs);
  };

  const postCartJson = async (url, payload) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Cart request failed.');
    }

    return response.json();
  };

  cartRoot.addEventListener('click', async (event) => {
    const quantityButton = event.target.closest('[data-cart-quantity-trigger]');
    if (quantityButton) {
      const row = quantityButton.closest('[data-cart-item]');
      const input = row ? row.querySelector('[data-cart-quantity-input]') : null;

      if (!row || !input) {
        return;
      }

      const nextQuantity = quantityButton.dataset.cartQuantityTrigger === 'increase'
        ? clampQuantity(input.value) + 1
        : Math.max(1, clampQuantity(input.value) - 1);

      input.value = nextQuantity;
      recalculateCart();
      clearFeedback();
      scheduleQuantitySync();
      return;
    }

    const removeButton = event.target.closest('[data-cart-remove]');
    if (removeButton) {
      event.preventDefault();
      clearFeedback();
      setButtonLoading(removeButton, true);

      try {
        const cart = await postCartJson(`${window.Shopify.routes.root}cart/change.js`, {
          id: removeButton.dataset.key,
          quantity: 0,
        });
        syncCartState(cart);
        showFeedback('Product removed from cart.', 'success');
      } catch (error) {
        showFeedback('Could not remove the product right now.', 'error');
      } finally {
        setButtonLoading(removeButton, false);
      }
      return;
    }
  });

  cartRoot.addEventListener('input', (event) => {
    const input = event.target.closest('[data-cart-quantity-input]');
    if (!input) {
      return;
    }

    clearFeedback();
    recalculateCart();
    scheduleQuantitySync();
  });

  cartRoot.addEventListener('change', (event) => {
    const input = event.target.closest('[data-cart-quantity-input]');
    if (!input) {
      return;
    }

    input.value = clampQuantity(input.value);
    recalculateCart();
    scheduleQuantitySync();
  });

  if (openCheckoutButton) {
    openCheckoutButton.addEventListener('click', () => {
      clearFeedback();
      getRows().forEach((row) => {
        const input = row.querySelector('[data-cart-quantity-input]');
        if (input) {
          input.value = clampQuantity(input.value);
        }
      });
      recalculateCart();
      openCheckoutDrawer();
    });
  }

  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', closeCheckoutDrawer);
  }

  closeCheckoutButtons.forEach((button) => {
    button.addEventListener('click', closeCheckoutDrawer);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCheckoutDrawer();
    }
  });

  window.addEventListener('pagehide', () => {
    setBodyScrollLock(false);
  });

  recalculateCart();
})();
