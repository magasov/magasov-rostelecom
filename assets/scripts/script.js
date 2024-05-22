async function fetchItems() {
    try {
        const response = await fetch('http://localhost:3000/items');
        if (!response.ok) {
            throw new Error('Ошибка HTTP: ' + response.status);
        }
        const items = await response.json();
        const itemsContainer = document.getElementById('items-container');
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <img src="${item.images || ''}" alt="Image">
                <h2>${item.name}</h2>
                <p>${item.description || ''}</p>
                <p class="availability">Наличие: ${item.nalic}</p>
                <p>${item.articul}</p>
                <p>${item.price}</p>
            `;
            itemsContainer.appendChild(itemCard);
        });
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

window.onload = fetchItems;