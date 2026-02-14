function sortPizzas() {
    const grid = document.querySelector('.card-grid');
    const cards = Array.from(grid.querySelectorAll('.card'));
    const filterValue = document.getElementById('pizza-filter').value;

    if (filterValue === 'default') {
        location.reload(); 
        return;
    }

    const sortedCards = cards.sort((a, b) => {
        const nameA = a.querySelector('.pizza-info').innerText.toLowerCase();
        const nameB = b.querySelector('.pizza-info').innerText.toLowerCase();
        
        const priceA = parseInt(a.querySelector('.price').innerText.replace(/\s/g, '').replace('₴', ''));
        const priceB = parseInt(b.querySelector('.price').innerText.replace(/\s/g, '').replace('₴', ''));

        if (filterValue === 'alphabet') return nameA.localeCompare(nameB);
        if (filterValue === 'price-desc') return priceB - priceA;
        if (filterValue === 'price-asc') return priceA - priceB;
    });

    grid.innerHTML = '';
    sortedCards.forEach(card => grid.appendChild(card));
}

function addToCart(button) {
    const card = button.closest('.card');
    const name = card.querySelector('.pizza-info').innerText;
    const price = parseInt(card.querySelector('.price').innerText.replace(/\s/g, '').replace('₴', ''));
    const image = card.querySelector('.pizza-img').src;

    // 1. Отримуємо існуючий масив товарів або створюємо порожній, якщо кошик ще чистий
    let cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];

    // 2. Перевіряємо, чи є вже така піца в кошику
    const existingPizzaIndex = cart.findIndex(item => item.name === name);

    if (existingPizzaIndex > -1) {
        // Якщо є — збільшуємо кількість
        cart[existingPizzaIndex].quantity += 1;
    } else {
        // Якщо немає — додаємо як новий об'єкт
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // 3. Зберігаємо оновлений масив
    localStorage.setItem('pizzaCart', JSON.stringify(cart));

    // 4. Переходимо в кошик
    window.location.href = 'buy.html';
}

function searchPizza() {
    // Отримуємо текст із поля пошуку
    const input = document.getElementById('pizza-search');
    const filter = input.value.toLowerCase().trim();
    
    // Отримуємо всі картки товарів
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Беремо назву піци саме з того блоку, де вона написана
        const title = card.querySelector('.pizza-info').innerText.toLowerCase();
        
        // Якщо назва містить текст із пошуку — показуємо, інакше — ховаємо
        if (title.includes(filter)) {
            card.style.display = "flex"; // Повертаємо видимість (у вас в CSS картки flex)
        } else {
            card.style.display = "none"; // Ховаємо
        }
    });
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