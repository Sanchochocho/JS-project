const form = document.getElementById('register-form')

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Этот email уже зарегистрирован.');
        return;
    }

    let a = localStorage.setItem(email, JSON.stringify({ password }));
    console.log(a);
    

    alert('Регистрация успешна! Переходите на страницу входа.');
    window.location.href = '../templates/sign_in.html';
});