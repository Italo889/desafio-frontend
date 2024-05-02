const section = document.querySelector('.products-cards');
const moreProductsButton = document.querySelector('.more-products-button');
const newsletterForm = document.querySelector('.newsletter-form');

let currentPage = 1;

const fetchProducts = (page) => {
    fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${page}`)
        .then((res) => res.json())
        .then((json) => {
            displayProducts(json.products);
            if (json.nextPage) {
                currentPage = page + 1;
                moreProductsButton.style.display = 'block';
            } else {
                moreProductsButton.style.display = 'none';
            }
        });
};
const displayProducts = (products) => {

    products.slice(0, productsPerPage).forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img class="card-image" src="https:${product.image}" alt="${product.name}">
            <p class="product-name">${product.name}</p>
            <p class="product-description">${product.description}</p>
            <p class="old-price">De: R$${product.oldPrice.toFixed(2).replace('.', ',')}</p>
            <p class="price">Por: R$${product.price.toFixed(2).replace('.', ',')}</p>
            <p class="installments">ou ${product.installments.count}x de R$${(product.installments.value).toFixed(2).replace('.', ',')}</p>
            <button class="buy-button">Comprar</button>
        `;

        section.appendChild(card);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(currentPage);
});

moreProductsButton.addEventListener('click', () => {
    fetchProducts(currentPage);
});

newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector('input[name="email"]');
    const emailValue = emailInput.value.trim();

    if (!isValidEmail(emailValue)) {
        alert('Please enter a valid email.');
        return;
    }
});

