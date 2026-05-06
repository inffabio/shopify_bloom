export function initProductsPagination() {
  const searchInput = document.getElementById('search-products');
  const productCount = document.getElementById('product-count');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const products = document.querySelectorAll('a[href*="/products/"]');
    let visibleCount = 0;

    products.forEach((product) => {
      const title = product.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = product.querySelector('p')?.textContent.toLowerCase() || '';

      if (title.includes(query) || description.includes(query) || query === '') {
        product.classList.remove('hidden');
        visibleCount++;
      } else {
        product.classList.add('hidden');
      }
    });

    if (productCount) {
      productCount.textContent = visibleCount;
    }
  });
}
