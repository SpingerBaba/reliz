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

const contactsLink = document.getElementById('contacts-link');
const contactsModal = document.getElementById('contacts-modal');
const closeContactsBtn = document.getElementById('close-contacts');

// Open modal when Contacts link is clicked
if (contactsLink && contactsModal) {
    contactsLink.addEventListener('click', function(e) {
        e.preventDefault();
        contactsModal.style.display = 'flex';
    });
}

// Close modal when X button is clicked
if (closeContactsBtn && contactsModal) {
    closeContactsBtn.addEventListener('click', function() {
        contactsModal.style.display = 'none';
    });
}

// Close modal when clicking outside the modal content
if (contactsModal) {
    contactsModal.addEventListener('click', function(e) {
        if (e.target === contactsModal) {
            contactsModal.style.display = 'none';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactsModal && contactsModal.style.display === 'flex') {
        contactsModal.style.display = 'none';
    }
});