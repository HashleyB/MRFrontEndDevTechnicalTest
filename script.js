document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('product-form'); // Get the product form
    const errorMessage = document.getElementById('error-message'); // Get the error message element
    const cartItems = document.querySelector('.listCart'); // Get the shopping cart list
    const iconCart = document.querySelector('.icon-cart'); // Get the cart icon
    const cartItemCount = document.querySelector('.icon-cart span'); // Get the cart item count
    const closeCart = document.querySelector('.close'); // Get the close cart button
    let body = document.querySelector('body'); // Get the body element

    // Toggle shopping cart visibility
    iconCart.addEventListener('click', function() {
        body.classList.toggle('showCart');
    });

    // Close shopping cart
    closeCart.addEventListener('click', function() {
        body.classList.remove('showCart');
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const size = document.querySelector('input[name="size"]:checked'); // Get the selected size
        
        if (!size) {
            errorMessage.textContent = "Please select a size"; // Show error message if size is not selected
        } else {
            errorMessage.textContent = ""; // Clear error message

            // Add item to cart
            addToCart(size.value);
        }
    });

    // Function to add item to cart
    function addToCart(size) {
        const existingItem = Array.from(cartItems.children).find(item => item.dataset.size === size); // Check if item already exists in cart
        if (existingItem) {
            const quantity = parseInt(existingItem.dataset.quantity) + 1; // Increment quantity if item exists
            existingItem.dataset.quantity = quantity; // Update quantity data attribute
            const price = 75.00; // Product price
            existingItem.querySelector('.totalPrice').textContent = `${quantity} x $${price.toFixed(2)}`; // Update total price
        } else {
            const item = document.createElement('div'); // Create a new item element
            item.classList.add('item'); // Add 'item' class
            item.dataset.size = size; // Set 'size' data attribute
            item.dataset.quantity = 1; // Set 'quantity' data attribute

            // HTML content for the item
            const productInfo = `
                <div class="image">
                    <img src="images/classic-tee.jpg">
                </div>
                <div class="name">Classic Tee</div>
                <div class="totalPrice">1 x $75.00</div>
                <div class="size">Size: ${size}</div>
                <div class="quantity">
                    <button class="minus">-</button>
                    <span>1</span>
                    <button class="plus">+</button>
                </div>
            `;

            item.innerHTML = productInfo; // Set item HTML content

            cartItems.appendChild(item); // Append item to cart
        }

        // Update the cart item count
        cartItemCount.textContent = parseInt(cartItemCount.textContent) + 1;
    }

    // Event listener for plus and minus buttons to update item quantity
    cartItems.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('minus')) {
            const item = target.closest('.item');
            const quantity = parseInt(item.dataset.quantity);
            if (quantity > 1) {
                item.dataset.quantity = quantity - 1;
                const price = 75.00; // Product price
                item.querySelector('.totalPrice').textContent = `${quantity - 1} x $${price.toFixed(2)}`;
                item.querySelector('.quantity span').textContent = quantity - 1;
            }
        } else if (target.classList.contains('plus')) {
            const item = target.closest('.item');
            const quantity = parseInt(item.dataset.quantity);
            item.dataset.quantity = quantity + 1;
            const price = 75.00; // Product price
            item.querySelector('.totalPrice').textContent = `${quantity + 1} x $${price.toFixed(2)}`;
            item.querySelector('.quantity span').textContent = quantity + 1;
        }
    });
});
