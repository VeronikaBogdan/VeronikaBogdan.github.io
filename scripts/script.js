

const headerCityButton = document.querySelector('.header__city-button'); //селектор по классу


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
//блокировка
const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    
    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
};

//разблокировка
const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY
    });
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



// ЗАПРОС БАЗЫ ДАННЫХ

const getData = async () => {
    const data = await fetch('db.json');

    if (data.ok) {
        return data.json()
    } else {
        throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`)
    }
};

const getGoods = (callback) => {
    getData()
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.log(err);
        });
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


try {

    const goodsList = document.querySelector('.goods__list');

    if (!goodsList){
        throw `This is not a goods page`; //исключение
    }

    const createCard = data => {

        const id = data.id;
        const preview = data.preview;
        const cost = data.cost;
        const brand = data.brand;
        const name = data.name;
        const sizes = data.sizes;


        const li = document.createElement('li');

        li.classList.add('goods__items');

        li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="">
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                    <p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>
                    <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                </div>
            </article>
        `;

        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = '';

        data.forEach((item) => {
            const card =  createCard(item);
            goodsList.append(card);
        });
    };

    getGoods(renderGoodsList);

} catch (err) {
    console.warn(err);
}