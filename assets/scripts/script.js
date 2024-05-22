async function fetchItems() {
    try {
        const response = await fetch('http://localhost:3000/items');
        if (!response.ok) {
            throw new Error('Ошибка HTTP: ' + response.status);
        }
        const items = await response.json();
        const itemsContainer = document.getElementById('items-container');

        if (!itemsContainer) {
            console.error('Контейнер элементов не найден.');
            return;
        }

        items.forEach(item => {
            const parentDiv = document.createElement('div');
            parentDiv.classList.add('parent-div');

            const image = document.createElement('img');
            image.src = item.images || '';
            image.alt = 'Image';

            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image-div');
            imageDiv.appendChild(image);
            imageDiv.innerHTML += `<div class="content_absolute-novinka">Новинка</div>`;

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content-div');
            contentDiv.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description || ''}</p>
                <div class="content-div2">
                    <li class="availability">${item.nalic}</li>
                    <p>${item.articul}</p>
                </div>
                <p class="product-price">${item.price} ₽</p>
            `;

            const additionalDiv = document.createElement('div');
            additionalDiv.classList.add('additional-div');

            const button = document.createElement('button'); 
            button.classList.add('opacity-btn')
            button.textContent = 'В корзину'; 

            additionalDiv.appendChild(button); 

            parentDiv.appendChild(imageDiv);
            parentDiv.appendChild(contentDiv);
            parentDiv.appendChild(additionalDiv);

            itemsContainer.appendChild(parentDiv);
        });
    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
    }
}

window.onload = fetchItems;
