// Получаем элементы из HTML
const cartItemsContainer = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");

// Функция для загрузки товаров из localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Проверяем, пуста ли корзина
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Ваша корзина пуста.</p>";
        cartSummary.textContent = "";
        return;
    }

    // Если корзина не пуста, очищаем контейнеры
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    // Отображаем каждый товар
    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.image}" alt="${item.title}">
            <p>Цена за единицу: ${item.price}₽</p>
            <div class="quantity-controls">
                <button class="decrease" data-id="${item.id}">-</button>
                <span class="quantity">${item.count}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            <p>Общая цена: <span class="item-total">${item.price * item.count}</span>₽</p>
            <button class="remove-item" data-id="${item.id}">Удалить</button>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Увеличиваем общую сумму
        totalPrice += item.price * item.count;
    });

    // Отображаем общую сумму
    cartSummary.textContent = `Общая сумма: ${totalPrice}₽`;

    // Обновляем обработчики событий
    addEventListeners();
}

// Функция для изменения количества товара
function updateItemCount(productId, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Находим товар по ID и обновляем количество
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].count += change;

        // Удаляем товар, если количество становится 0
        if (cart[itemIndex].count <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    // Сохраняем изменения в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Обновляем отображение
    loadCartItems();
}

// Функция для удаления товара
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Удаляем товар по ID
    cart = cart.filter((item) => item.id !== productId);

    // Сохраняем изменения в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Обновляем отображение
    loadCartItems();
}

// Функция для добавления обработчиков событий
function addEventListeners() {
    // Селекторы динамически добавленных кнопок
    const increaseButtons = document.querySelectorAll(".increase");
    const decreaseButtons = document.querySelectorAll(".decrease");
    const removeButtons = document.querySelectorAll(".remove-item");

    // Обработчики для увеличения количества
    increaseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.dataset.id;
            updateItemCount(productId, 1); // Увеличиваем количество
        });
    });

    // Обработчики для уменьшения количества
    decreaseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.dataset.id;
            updateItemCount(productId, -1); // Уменьшаем количество
        });
    });

    // Обработчики для удаления товара
    removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.dataset.id;
            removeFromCart(productId); // Удаляем товар
        });
    });
}

// Загружаем товары при открытии страницы
loadCartItems();
