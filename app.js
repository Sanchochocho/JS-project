const products = 'https://fakestoreapi.com/products'

fetch(products,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())
    .then(json=> {
        let render = json.map(item =>{
            const productsList = document.querySelector('.products_list')
            const productBlock = document.createElement('div')
            productBlock.innerHTML = `
            <h2> ${item.title} </h2>
            <p> ${item.price} </p>
            <button onclick="addToCart(${item.id})"> Добавить в корзину </button>
            `
            productsList.append(productBlock)

        })
        function renderProducts(productId){
            let cart = JSON.parse(localStorage.getItem('cart')) || []
            const product = products.search(element=> element.id === productId)

            const cartItem = cart.find(item => item.id === productId)

            if (cartItem) {
                cartItem.count += 1
            } else{
                cart.push({...product, count: 1})//Деструктуризация
            }
            localStorage.setItem('cart', JSON.stringify(cart))
        
            console.log(cart);

        }
        renderProducts()
    })
        
            
            
            
        

        


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

let cart = JSON.parse(localStorage.getItem('cart')) || []

function addToCart(productId){
    const product = products.find(element=> element.id === productId)

    const cartItem = cart.find(item => item.id === productId)

    if (cartItem) {
        cartItem.count += 1
    } else{
        cart.push({...product, count: 1})//Деструктуризация
    }
    localStorage.setItem('cart', JSON.stringify(cart))

    console.log(cart);
    
}