const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

const API_URL = 'https://crudcrud.com/api/1d7d510be2014815aff22269ed24429a/products';

// Load products on page load
window.addEventListener('DOMContentLoaded', loadProducts);

// Submit form
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value;

  const product = { name, price, category };

  try {
    const res = await axios.post(API_URL, product);
    addProductToList(res.data);
    form.reset();
  } catch (err) {
    console.error('Error adding product:', err);
  }
});

// Load all products
async function loadProducts() {
  try {
    const res = await axios.get(API_URL);
    res.data.forEach(product => addProductToList(product));
  } catch (err) {
    console.error('Error loading products:', err);
  }
}

// Add product to DOM
function addProductToList(product) {
  const col = document.createElement('div');
  col.className = 'col-md-4 product-card';

  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">
          Price: ₹${product.price} <br>
          Category: ${product.category}
        </p>
        <button class="btn btn-danger" onclick="deleteProduct('${product._id}', this)">Delete</button>
      </div>
    </div>
  `;
  productList.appendChild(col);
}


// Delete product
async function deleteProduct(id, btn) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    const li = btn.parentElement;
    li.remove();
  } catch (err) {
    console.error('Error deleting product:', err);
  }
}