const products = [
    { name: "Laptop", category: "Electronics" },
    { name: "Smartphone", category: "Electronics" },
    { name: "Deep Learning", category: "Books" },
    { name: "Shirt", category: "Clothing" },
    { name: "Football", category: "Sports" },
    { name: "Jeans", category: "Clothing" },
    { name: "Basketball", category: "Sports" },
    { name: "Data Science", category: "Books" },
    { name: "Tablet", category: "Home" },
    { name: "Blender", category: "Home" }
];

const categorySelect = document.getElementById("category");
const productList = document.getElementById("product-list");


function updateProductList() {
    const selectedCategory = categorySelect.value;

    const filteredProducts = products.filter(product => {
        return selectedCategory === 'all' || product.category === selectedCategory;
    });

    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        productList.innerHTML += `<div class="product-item">${product.name}</div>`;
    });
}

categorySelect.addEventListener('change', updateProductList);

updateProductList();
  