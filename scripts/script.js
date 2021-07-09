

const headerCityButton = document.querySelector('.header__city-button'); //селектор по классу


//тернарный оператор , получаем данные из localStorage
headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город';

//добавляем слушатель событий
headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
});


//  БЛОКИРОВКА СКРОЛЛА

// 1 способ 
/*const disableScroll = () => {
    document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
    document.body.style.overflow = '';
};*/

// 2 способ
const disableScroll = () => {
    document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
    document.body.style.overflow = '';
};


// МОДАЛЬНОЕ ОКНО 

const subHeaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');


const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
};

subHeaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', event => {    
    //console.log(event.target);  // выводятся данные, куда кликнули и что это за элемент
    const target = event.target;

    // 1 СПОСОБ
    /*if (target.classList.contains('cart__btn-close')){
        cartModalClose(); 
    }*/

    // 2 СПОСОБ
    // matches проверяет селектор => ставим точку, если класс
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')){
        cartModalClose(); 
    }
});
