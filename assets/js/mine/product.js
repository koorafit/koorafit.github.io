class ProductManager {
    constructor(products) {
        this.products = products;
        this.productsContainer = document.getElementById('productsContainer');
    }

    generateProductHTML(product) {
        return `
            <div class="col-4 col-6-xsmall">
                <span class="image fit"><img src="${product.image}" alt="" class="product-image" /></span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: £${product.price}</p>
                <ul class="actions small">
                    <li style="text-align: center;">
                        <a href="dynamicProduct.html?id=${product.id}" class="button product-link" onclick="saveClickedProduct(${product.id})">View Details</a>
                    </li>
                    <li style="text-align: center;">
                        <a href="#" class="button primary" onclick="addToBasket('${product.name}', ${product.price}, '${product.image}')">Add to Basket</a>
                    </li>
                </ul>
            </div>
        `;
    }

    loadProducts() {
        if (this.productsContainer) {
            this.products.forEach(product => {
                const productHTML = this.generateProductHTML(product);
                this.productsContainer.innerHTML += productHTML;
            });
        }
    }

    loadProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (product) {
            this.productsContainer.innerHTML = this.generateProductHTML(product);
        } else {
            this.productsContainer.innerHTML = 'Product not found';
        }
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
    
}

const products = [
    {
        id: 1,
        name: 'Groin Guard',
        description: 'Groin guard for Men is made of breathable elasticated material to provide movement.',
        price: 9.99,
        image: 'images/Shop/cupGuard.jpg'
      },
      {
        id: 2,
        name: 'Hand Wraps',
        description: '75 cm long hook-and-loop closure of the inner gloves is made with a blend of cotton and nylon.',
        price: 10.00,
        image: 'images/Shop/wrap.jpg'
      },
      {
        id: 3,
        name: 'Headguard',
        description: 'Face boxing headguard is designed for sparring in mind and to get you ready for war.',
        price: 30.00,
        image: 'images/Shop/headGuard.jpg'
      },
      {
        id: 4,
        name: 'Mouthguard',
        description: 'We have a pre-formed base to our mouthguards that we like to call JawSecure.',
        price: 5.00,
        image: 'images/Shop/mouthgarud.jpg'
      },
      {
        id: 5,
        name: 'Muay thai shin guards',
        description: 'DURABLE & LONG LASTING-Manufactured with premium quality Lamina Hide Leather.',
        price: 50.00,
        image: 'images/Shop/shinGuards.jpg'
      },
      {
        id: 6,
        name: 'Muay Thai Shorts',
        description: 'Made up of High Quality Moisture Wicking Satin Fabric.',
        price: 15.00,
        image: 'images/Shop/shorts.jpg'
      },
      {
        id: 7,
        name: 'Boxing Gloves',
        description: 'No matter how hard you punch these gloves make sure to outlast your intense training.',
        price: 20.00,
        image: 'images/Shop/gloves.jpg'
      }
];

document.addEventListener('DOMContentLoaded', () => {
    const manager = new ProductManager(products);
    manager.loadProducts();
});
