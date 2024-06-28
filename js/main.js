// Definir la URL base de la API
const API_URL = 'http://localhost:3000/products';

// Obtener referencias a elementos del DOM
const productForm = document.getElementById('productForm');
const productGrid = document.getElementById('productGrid');

// Función para obtener todos los productos y actualizar el DOM
async function getAllProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        updateProductGrid(products);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Función para agregar un nuevo producto
async function addProduct(product) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        getAllProducts(); // Actualizar la lista de productos
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Función para eliminar un producto
async function deleteProduct(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        getAllProducts(); // Actualizar la lista de productos
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Función para actualizar el DOM con los productos
function updateProductGrid(products) {
    productGrid.innerHTML = ''; // Limpiar el contenido existente
    products.forEach(product => {
        const productCard = document.createElement('article');
        productCard.className = 'card';

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
        button.addEventListener('click', (event) => {
            const productId = event.target.closest('.delete-button').getAttribute('data-id');
            deleteProduct(productId);
        });
    });
}

// Event listener para el formulario de agregar producto
productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newProduct = {
        name: productForm.nombre.value,
        price: parseFloat(productForm.precio.value),
        image: productForm.imagen.value
    };
    addProduct(newProduct);
    productForm.reset(); // Limpiar el formulario
});

// Inicializar la lista de productos al cargar la página
document.addEventListener('DOMContentLoaded', getAllProducts);
