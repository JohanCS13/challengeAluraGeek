import { deleteProduct } from './app.js';

const productGrid = document.getElementById('card');

export function updateProductGrid(products) {
    productGrid.innerHTML = ''; // Limpiar el contenido existente
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card__content';

        productCard.innerHTML = `
            <img src="${product.image}" class="card__image" alt="${product.name}">
            <div class="card__container-info">
                <h3>${product.name}</h3>
                <div class="card__container-value">
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button class="delete-button" aria-label="Eliminar" data-id="${product.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(productCard);
    });

    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.closest('.delete-button').getAttribute('data-id');
            await deleteProduct(productId);
            await refreshProductGrid();
        });
    });
}

export async function refreshProductGrid() {
    const products = await getAllProducts();
    updateProductGrid(products);
}
