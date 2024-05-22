function fetchItems(url, containerId, openModalCallback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP Error: ' + response.status);
            }
            return response.json();
        })
        .then(items => {
            const itemsContainer = document.getElementById(containerId);

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

                const isNew = containerId === 'items-container';
                const label = isNew ? 'Новинка' : 'Хит';
                const labelClass = isNew ? 'content_absolute-novinka' : 'content_absolute-hit';
                imageDiv.innerHTML += `<div class="${labelClass}">${label}</div>`;

                const contentDiv = document.createElement('div');
                contentDiv.classList.add('content-div');

                const availabilityClass = item.nalic === "Нет в наличии" ? 'not-available' : 'available';

                contentDiv.innerHTML = `
                    <h2>${item.name}</h2>
                    <p>${item.description || ''}</p>
                    <div class="content-div2">
                        <li class="availability ${availabilityClass}">${item.nalic}</li>
                        <p>${item.articul}</p>
                    </div>
                    <p class="product-price">${item.price} ₽</p>
                `;



                const additionalDiv = document.createElement('div');
                additionalDiv.classList.add('additional-div');

                const additionalDiv1 = document.createElement('div');
                additionalDiv1.classList.add('additional-div1');
                additionalDiv1.innerHTML = `
                    <div><img src="../assets/images/tovar/IconLike.svg"></div>
                    <div><img src="../assets/images/tovar/IconIzbranoe.svg"></div>
                    <div class="pokaz"><img src="../assets/images/tovar/IconYey.svg"></div>
                `;

                const button = document.createElement('button');
                button.classList.add('opacity-btn');
                button.textContent = 'В корзину';

                additionalDiv.appendChild(button);
                additionalDiv.appendChild(additionalDiv1);

                parentDiv.appendChild(imageDiv);
                parentDiv.appendChild(contentDiv);
                parentDiv.appendChild(additionalDiv);

                itemsContainer.appendChild(parentDiv);

                const pokazButton = additionalDiv1.querySelector('.pokaz');
                pokazButton.addEventListener('click', () => openModalCallback(item));
            });
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error.message);
        });
}

function openModal(item) {
    const modal = document.getElementById('modal');
    const { name, description = '', nalic, articul, price, images = '' } = item;

    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-availability').textContent = nalic;
    document.getElementById('modal-articul').textContent = articul;
    document.getElementById('modal-price').textContent = `${price} ₽`;
    document.getElementById('modal-image').src = images;

    modal.style.display = 'block';

    const closeModal = () => {
        modal.style.display = 'none';
        closeBtn.removeEventListener('click', closeModal);
        window.removeEventListener('click', windowClickHandler);
    };

    const closeBtn = document.querySelector('.modal .close');
    closeBtn.addEventListener('click', closeModal);

    const windowClickHandler = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
    window.addEventListener('click', windowClickHandler);
}

window.onload = function () {
    fetchItems('http://localhost:3000/items', 'items-container', openModal);
    fetchItems('http://localhost:3000/cartItems', 'hity-container', openModal);
};
