// basket.js


// Function to get the basket from localStorage
function getBasket() {
    var basket = JSON.parse(localStorage.getItem('basket')) || [];
    return basket;
}

function addToBasket(productName, productPrice, productImage) {
    event.preventDefault();

    // Create an object representing the product
    var product = {
        name: productName,
        price: productPrice,
        image: productImage, // Add the image URL to the product
        quantity: 1 // Initialize the quantity to 1 for a new item
    };

    // Retrieve the existing basket from localStorage or create an empty array
    var basket = JSON.parse(localStorage.getItem('basket')) || [];

    // Check if the product already exists in the basket
    var existingProduct = basket.find(item => item.name === productName);
    if (existingProduct) {
        // If the product already exists, increment its quantity
        existingProduct.quantity++;
    } else {
        // If it's a new product, add it to the basket
        basket.push(product);
    }

    // Store the updated basket back in localStorage
    localStorage.setItem('basket', JSON.stringify(basket));

    // Optionally, you can display a confirmation message
    // alert(productName + " has been added to your basket!");

    // Update the total item count
    updateTotalItemCount();
    displayBasketItems();
}


// Function to update the total item count
function updateTotalItemCount() {
    var basket = getBasket();

    // Calculate the total item count considering the quantity of each item
    var totalItemCount = basket.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    // Display the total item count on the page (you can customize where to display this)
    document.getElementById('totalItemCount').innerText = totalItemCount;
}

function removeAllFromBasket() {
    // Clear the basket in localStorage
    localStorage.removeItem('basket');

    // Update the total item count to 0
    updateTotalItemCount();
    displayBasketItems();
    // Optionally, you can update the display of the basket items
    // const basketContainer = document.getElementById("basket-items");
    // if (basketContainer) {
    //     basketContainer.innerHTML = ""; // Clear the container
    // }
}



function removeOneFromBasket(productName) {
    // Retrieve the existing basket from localStorage
    var basket = getBasket();

    // Find the product in the basket
    var productIndex = basket.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        // If the product exists in the basket, decrement its quantity
        if (basket[productIndex].quantity > 1) {
            basket[productIndex].quantity--;
        } else {
            // If the quantity is 1, remove the product from the basket
            basket.splice(productIndex, 1);
        }

        // Update the basket in localStorage
        localStorage.setItem('basket', JSON.stringify(basket));

        // Refresh the display of the basket items
        displayBasketItems();
    }
}

function displayBasketItems() {
    const basketContainer = document.getElementById("basket-items");
    const basketItems = getBasket();

    if (basketContainer) {
        basketContainer.innerHTML = ""; // Clear the container

        if (basketItems.length > 0) {
            const table = document.createElement("table");
            table.style.width = "100%"; // Set table width to 100%

            const headerRow = document.createElement("thead");
            headerRow.innerHTML = `
                <tr>
                <th style="text-align: center; width: 25%;">Product</th>
                <th style="text-align: center; width: 25%;">Name</th>
                <th style="text-align: center; width: 25%;">Quantity</th>
                <th style="text-align: center; width: 25%;">Price</th>
                </tr>
            `;
            table.appendChild(headerRow);

            // Set a fixed height for table rows
            const rowHeight = "50px"; // Adjust the height as needed

            // Create a table row for each item
            const tbody = document.createElement("tbody");

            basketItems.forEach(item => {
                const row = document.createElement("tr");
                row.style.height = rowHeight; // Set the row height

                row.innerHTML = `
                <td style="text-align: center; vertical-align: middle;">
                <img src="${item.image}" alt="${item.name}" width="100" height="100"/>
            </td>
                    <td class="item-name" style="text-align: center; vertical-align: middle;">${item.name}</td>
                    <td class="item-quantity" style="text-align: center; vertical-align: middle;">
                        ${item.quantity} <br>
                        <ul class="actions small" style="justify-content: center;">
                            <li><a class="button small" onclick="removeOneFromBasket('${item.name}')"> - </a></li>
                            <li><a class="button small" onclick="addToBasket('${item.name}', ${item.price}, '${item.image}')"> + </a></li>
                        </ul>
                    </td>
                    <td class="item-price" style="text-align: center; vertical-align: middle;">£${(item.price * item.quantity).toFixed(2)}</td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            // Add the "total-info" row as the last row in the table
            const totalRow = document.createElement("tfoot");
            totalRow.innerHTML = `
                <tr>
                    <td colspan="1"></td>
                    <td class="total" style="text-align: center; vertical-align: middle;">Total:</td>
                    <td class="total-quantity" style="text-align: center; vertical-align: middle;"></td>
                    <td class="total-cost" style="text-align: center; vertical-align: middle;"></td>
                </tr>
            `;
            table.appendChild(totalRow);

            basketContainer.appendChild(table);

            // Use calculateTotalCost and calculateTotalQuantity functions
            const totalCostCell = totalRow.querySelector(".total-cost");
            const totalQuantityCell = totalRow.querySelector(".total-quantity");

            const totalCost = calculateTotalCost(basketItems);
            const totalQuantity = calculateTotalQuantity(basketItems);

            totalCostCell.innerHTML += ` £${totalCost.toFixed(2)}`;
            totalQuantityCell.innerHTML += ` ${totalQuantity}`;
        } else {
            basketContainer.textContent = "Your basket is empty.";
        }
    }
}



function calculateTotalCost(basketItems) {
    return basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateTotalQuantity(basketItems) {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
}




updateTotalItemCount();