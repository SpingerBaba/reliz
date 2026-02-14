// Перевірка наявності елементів, щоб уникнути помилок у консолі
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const qtyText = document.getElementById('qty');
const priceText = document.getElementById('total-price');
const deleteBtn = document.getElementById('delete-item');
const pizzaItem = document.getElementById('pizza-item');

let quantity = 1;
const basePrice = 1234;

if (plusBtn) {
    plusBtn.addEventListener('click', () => {
        quantity++;
        updateDisplay();
    });
}

if (minusBtn) {
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateDisplay();
        }
    });
}

if (deleteBtn && pizzaItem) {
    deleteBtn.addEventListener('click', () => {
        pizzaItem.style.display = 'none';
    });
}

function updateDisplay() {
    if (qtyText && priceText) {
        qtyText.innerText = quantity;
        priceText.innerText = quantity * basePrice;
    }
}

// Рендеринг реального кошика
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
});

function renderCart() {
    const cartContent = document.getElementById('cart-content');
    const cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
    
    if (cart.length > 0) {
        let html = '';
        let totalSum = 0;

        cart.forEach((pizza, index) => {
            totalSum += pizza.price * pizza.quantity;
            html += `
                <div class="cart-item" style="margin-bottom: 20px;">
                    <img src="${pizza.image}" alt="${pizza.name}" class="cart-img">
                    <span class="pizza-title">${pizza.name}</span>
                    <div class="counter-block">
                        <button class="count-btn" onclick="changeQty(${index}, 1)">+</button>
                        <span class="count-value">${pizza.quantity}</span>
                        <button class="count-btn" onclick="changeQty(${index}, -1)">-</button>
                    </div>
                    <span class="price-text"><span>${pizza.price * pizza.quantity}</span> hrn</span>
                    <button class="delete-btn" onclick="removeItem(${index})">Видалити</button>
                </div>
            `;
        });

        html += `
            <div style="text-align: right; color: white; font-size: 28px; margin-top: 20px; font-weight: bold; padding-right: 20px;">
                Загальна сума: ${totalSum} hrn
            </div>
        `;

        cartContent.innerHTML = html;
    } else {
        cartContent.innerHTML = `<h2 style="color: white; text-align: center; margin-top: 50px;">Кошик порожній :(</h2>`;
    }
}

function changeQty(index, amount) {
    let cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    renderCart();
}

function openPaymentModal() {
    const cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
    if (cart.length === 0) {
        alert("Спочатку додайте піцу в кошик!");
        return;
    }
    document.getElementById('payment-modal').style.display = 'flex';
}

// Закриття вікна
document.getElementById('close-payment').onclick = function() {
    document.getElementById('payment-modal').style.display = 'none';
    // Скидаємо текст, якщо вікно закрили
    resetModal();
};

// Обробка підтвердження
document.getElementById('confirm-order').onclick = function() {
    const phoneInput = document.getElementById('user-phone');
    const modalBody = document.getElementById('modal-body');

    if (phoneInput.value.trim().length < 10) {
        alert("Будь ласка, введіть коректний номер телефону");
        return;
    }

    // Змінюємо вміст вікна на подяку
    modalBody.innerHTML = `
    <div style="text-align: center; padding: 40px;">
        <h2 style="color: #600000; font-size: 35px; margin-bottom: 15px;">Дякуємо!</h2>
        <p style="font-size: 22px; color: #333;">Ми вам передзвонимо найближчим часом.</p>
        <button class="pay-btn" onclick="location.reload()" style="margin-top: 30px; padding: 15px 40px; font-size: 20px;">Закрити</button>
    </div>
    `;
};

function finalizeOrder() {
    // Очищуємо кошик після успішного замовлення
    localStorage.removeItem('pizzaCart');
    // Закриваємо модалку та оновлюємо сторінку
    window.location.reload();
}

function resetModal() {
    // Функція для повернення початкового вигляду модалки (якщо потрібно)
    location.reload(); 
}

// const contactsLink = document.getElementById('contacts-link');
// const contactsModal = document.getElementById('contacts-modal');
// const closeContactsBtn = document.getElementById('close-contacts');

// if (contactsLink && contactsModal) {
//     contactsLink.addEventListener('click', function(e) {
//         e.preventDefault();
//         contactsModal.style.display = 'flex'; // Відкриваємо
//     });
// }

// if (closeContactsBtn) {
//     closeContactsBtn.addEventListener('click', function() {
//         contactsModal.style.display = 'none'; // Закриваємо на хрестик
//     });
// }

// // Закриття при кліку на фон
// window.addEventListener('click', function(e) {
//     if (e.target === contactsModal) {
//         contactsModal.style.display = 'none';
//     }
// });