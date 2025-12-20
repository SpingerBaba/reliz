const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const qtyText = document.getElementById('qty');
const priceText = document.getElementById('total-price');
const deleteBtn = document.getElementById('delete-item');
const pizzaItem = document.getElementById('pizza-item');

let quantity = 1;
const basePrice = 1234;

plusBtn.addEventListener('click', () => {
    quantity++;
    updateDisplay();
});

minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        updateDisplay();
    }
});

deleteBtn.addEventListener('click', () => {
    pizzaItem.style.display = 'none';
});

function updateDisplay() {
    qtyText.innerText = quantity;
    priceText.innerText = quantity * basePrice;
}