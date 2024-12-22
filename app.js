const productsAPI = 'https://api.rawg.io/api/games?key=b0ce7c37b3964748a88c03aa93ff31cf';

const productsList = document.querySelector('.products_list');

fetch(productsAPI, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
    .then((res) => res.json())
    .then((json) => {
        json.results.forEach((item) => {
            const productBlock = document.createElement('div');
            productBlock.className = 'card';
            productBlock.innerHTML = `
                <h2 class='products_title'>${item.name}</h2>
                <img src="${item.background_image}" alt="${item.name}" class='products_img'>
                <p class='price'>Цена: ${item.rating}$</p>
                <button class='add'>Добавить в корзину</button>
            `;
            productBlock.querySelector('.add').addEventListener('click', () => {
                if (!isUserLoggedIn()) {
                    alert('Вы не авторизованы. Пожалуйста, зарегистрируйтесь!');
                    window.location.href = './sign_up.html';
                } else {
                    addToCart(item.id, item.name, item.rating);
                }
            });
            productsList.append(productBlock);
        });
    })
    .catch((error) => console.error('Ошибка загрузки продуктов:', error));

function addToCart(productId, productTitle, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find((item) => item.id === productId);

    if (cartItem) {
        cartItem.count += 1;
    } else {
        cart.push({ id: productId, title: productTitle, price: productPrice, count: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Товар "${productTitle}" добавлен в корзину!`);
}

function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

document.getElementById('register-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('isLoggedIn', 'true');

    alert('Регистрация успешна!');
    window.location.href = './sign_in.html';
});

document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    if (email === savedEmail && password === savedPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Вход выполнен успешно!');
        window.location.href = './cart.html'; // Перенаправление на главную страницу
    } else {
        alert('Неверные данные!');
    }
});


function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваша корзина пуста.</p>';
        return;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>Цена: ${item.price}$</p>
            <p>Количество: ${item.count}</p>
            <button class="remove" data-id="${item.id}">Удалить</button>
        `;
        cartItem.querySelector('.remove').addEventListener('click', () => {
            removeFromCart(item.id);
        });
        cartContainer.append(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
    const totalElement = document.createElement('p');
    totalElement.className = 'total';
    totalElement.innerText = `Общая сумма: ${total}$`;
    cartContainer.append(totalElement);
}




// function renderProducts(){
//     const productsList = document.querySelector('.products_list')

//     products.forEach(function(el) {
//         const productBlock = document.createElement('div')
//         productBlock.innerHTML = `
//         <h2> ${el.name} </h2>
//         <p> ${el.price} </p>
//         <button onclick="addToCart(${el.id})"> Добавить в корзину </button>
//         `
//         productsList.append(productBlock)
//     })
// }
// renderProducts()

// let cart = JSON.parse(localStorage.getItem('cart')) || []

// function addToCart(productId){
//     const product = products.find(element=> element.id === productId)

//     const cartItem = cart.find(item => item.id === productId)

//     if (cartItem) {
//         cartItem.count += 1
//     } else{
//         cart.push({...product, count: 1})//Деструктуризация
//     }
//     localStorage.setItem('cart', JSON.stringify(cart))

//     console.log(cart);
    
// }