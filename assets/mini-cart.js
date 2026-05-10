(() => {
  const roots = document.querySelectorAll('[data-mini-cart-root]');

  if (!roots.length || typeof window.jQuery === 'undefined') {
    return;
  }

  const $ = window.jQuery;

  const formatMoney = (moneyFormat, cents) => {
    const amount = (Number(cents || 0) / 100).toFixed(2);
    const withThousands = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return moneyFormat
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, Math.round(Number(cents || 0) / 100).toString())
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, amount.replace(/\./g, ','))
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, Math.round(Number(cents || 0) / 100).toString().replace(/\./g, ','))
      .replace(/\{\{\s*amount\s*\}\}/g, withThousands);
  };

  roots.forEach((root) => {
    const $root = $(root);
    const $toggle = $root.find('[data-mini-cart-toggle]').first();
    const $panel = $root.find('[data-mini-cart-panel]').first();
    const $overlay = $root.find('[data-mini-cart-overlay]').first();
    const $close = $root.find('[data-mini-cart-close]').first();
    const $items = $root.find('[data-mini-cart-items]').first();
    const $subtotal = $root.find('[data-mini-cart-subtotal]').first();
    const $count = $root.find('[data-mini-cart-count]').first();
    const moneyFormat = root.dataset.moneyFormat || '${{amount}}';
    const isDrawer = $overlay.length > 0;
    const animationDurationMs = 300;
    let hideTimer = null;

    const clearHideTimer = () => {
      if (hideTimer) {
        window.clearTimeout(hideTimer);
        hideTimer = null;
      }
    };

    const setBodyScrollLock = (lock) => {
      if (!isDrawer) {
        return;
      }

      document.body.classList.toggle('overflow-hidden', lock);
      document.documentElement.classList.toggle('overflow-hidden', lock);
    };

    const closePanel = () => {
      clearHideTimer();

      if (!isDrawer) {
        $panel.addClass('hidden pointer-events-none');
        $toggle.attr('aria-expanded', 'false');
        return;
      }

      setBodyScrollLock(false);

      $panel.addClass('translate-x-full');
      $overlay.removeClass('opacity-100').addClass('opacity-0');

      hideTimer = window.setTimeout(() => {
        $panel.addClass('hidden pointer-events-none');
        $overlay.addClass('hidden pointer-events-none');
      }, animationDurationMs);

      $toggle.attr('aria-expanded', 'false');
    };

    const openPanel = () => {
      clearHideTimer();

      if (!isDrawer) {
        $panel.removeClass('hidden pointer-events-none');
        $toggle.attr('aria-expanded', 'true');
        return;
      }

      setBodyScrollLock(true);

      $panel.removeClass('hidden pointer-events-none');
      $overlay.removeClass('hidden pointer-events-none');

      window.requestAnimationFrame(() => {
        $panel.removeClass('translate-x-full');
        $overlay.removeClass('opacity-0').addClass('opacity-100');
      });

      $toggle.attr('aria-expanded', 'true');
    };

    const renderItems = (cart) => {
      if (!cart || !Array.isArray(cart.items)) {
        $items.html('<p class="text-sm text-[#8B6F5C]/70">Could not load items.</p>');
        return;
      }

      const lineItemCount = Array.isArray(cart.items) ? cart.items.length : 0;

      $count.text(lineItemCount);
      $subtotal.text(formatMoney(moneyFormat, cart.total_price));

      if (lineItemCount === 0) {
        $items.html('<p class="text-sm text-[#8B6F5C]/70">Your cart is empty.</p>');
        return;
      }

      const rows = cart.items
        .slice(0, 4)
        .map((item) => {
          const image = item.image
            ? `<img src="${item.image}" alt="${item.product_title}" class="h-14 w-14 rounded-2xl object-cover">`
            : '<div class="h-14 w-14 rounded-2xl bg-[#F3E6DE]"></div>';

          return `
            <div class="flex items-center gap-3 py-2">
              <a href="${item.url}" class="shrink-0">${image}</a>
              <div class="min-w-0 flex-1">
                <a href="${item.url}" class="block truncate text-sm font-semibold text-[#8B6F5C]">${item.product_title}</a>
                <p class="text-xs text-[#8B6F5C]/65">Qty: ${item.quantity}</p>
              </div>
              <p class="text-sm font-semibold text-[#8B6F5C]">${formatMoney(moneyFormat, item.final_line_price)}</p>
            </div>
          `;
        })
        .join('');

      const moreItemsNote = cart.items.length > 4
        ? `<p class="pt-2 text-xs text-[#8B6F5C]/65">+ ${cart.items.length - 4} more item(s)</p>`
        : '';

      $items.html(rows + moreItemsNote);
    };

    const loadCart = () => {
      $items.html('<p class="text-sm text-[#8B6F5C]/70">Loading cart...</p>');

      $.getJSON(`${window.Shopify.routes.root}cart.js`)
        .done((cart) => {
          renderItems(cart);
        })
        .fail(() => {
          $items.html('<p class="text-sm text-[#B25E5E]">Could not load cart now.</p>');
        });
    };

    $toggle.on('click', (event) => {
      event.preventDefault();

      if ($panel.hasClass('hidden')) {
        openPanel();
        loadCart();
        return;
      }

      closePanel();
    });

    $close.on('click', (event) => {
      event.preventDefault();
      closePanel();
    });

    $overlay.on('click', () => {
      closePanel();
    });

    $(document).on('click', (event) => {
      const clickedInsideRoot = $(event.target).closest('[data-mini-cart-root]').length > 0;
      if (!clickedInsideRoot) {
        closePanel();
      }
    });

    $(document).on('keydown', (event) => {
      if (event.key === 'Escape') {
        closePanel();
      }
    });

    window.addEventListener('pagehide', () => {
      setBodyScrollLock(false);
    });

    document.addEventListener('bloom:cart-updated', (event) => {
      const cart = event.detail && event.detail.cart ? event.detail.cart : null;
      if (cart) {
        renderItems(cart);
      }
    });
  });
})();
