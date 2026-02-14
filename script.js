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
    let cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
    const existingPizzaIndex = cart.findIndex(item => item.name === name);

    if (existingPizzaIndex > -1) {
 
        cart[existingPizzaIndex].quantity += 1;
    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem('pizzaCart', JSON.stringify(cart));

    window.location.href = 'buy.html';
}

function searchPizza() {

    const input = document.getElementById('pizza-search');
    const filter = input.value.toLowerCase().trim();
    

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {

        const title = card.querySelector('.pizza-info').innerText.toLowerCase();
        
        if (title.includes(filter)) {
            card.style.display = "flex"; 
        } else {
            card.style.display = "none"; 
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    const contactsLink = document.getElementById('contacts-link');
    const contactsModal = document.getElementById('contacts-modal');
    const closeContactsBtn = document.getElementById('close-contacts');

    if (contactsLink && contactsModal) {
        contactsLink.onclick = function(e) {
            e.preventDefault();
            console.log("Клік по контактах спрацював!"); 
            contactsModal.style.display = 'flex';
        };
    }

    if (closeContactsBtn) {
        closeContactsBtn.onclick = function() {
            contactsModal.style.display = 'none';
        };
    }


    window.onclick = function(e) {
        if (e.target === contactsModal) {
            contactsModal.style.display = 'none';
        }
    };
});