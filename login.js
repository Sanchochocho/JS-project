document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const userData = localStorage.getItem(email);
    if (!userData) {
        alert('Пользователь с таким email не найден.');
        return;
    }

    const user = JSON.parse(userData);
    if (user.password !== password) {
        alert('Неверный пароль.');
        return;
    }

    alert('Добро пожаловать!');
    window.location.href = 'index.html';
});