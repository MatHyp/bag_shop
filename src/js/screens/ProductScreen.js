// import { getProduct } from './api-call.js';
// import swal from 'sweetalert';
// import { product } from "../data.js";
import {pro} from "../data.js"


const cartContainer = document.querySelector('.cart-container');
const help = document.querySelector('.help');
const nav = document.querySelector('.nav-bar');
const bookmark = document.querySelector('.bookmark');
const summary = document.querySelector('.summary');
const main = document.querySelector('.help');

let cart = [];
let products = pro();

//render Product screen to html


const ProductScreen = {
  renderHtml: async () => {
    const ur = window.location.href.slice(-1);
    let product = products[ur - 1];
    
    console.log(product);
    const html = `
    <section class="product-section">
    <img src="${product.img}" alt="" class="biggest-img" />
    
    <div class="product-description">
    <div class="rating">
    <i class="fa fa-star" aria-hidden="true"></i>
    <i class="fa fa-star" aria-hidden="true"></i>
    <i class="fa fa-star" aria-hidden="true"></i>
    <i class="fa fa-star" aria-hidden="true"></i>
    <i class="fa fa-star" aria-hidden="true"></i>
    </div>
        <h1>${product.name}</h1>
        <h2>${product.price}$</h2>

        <button class="add-to" id="${ur}">Add to card</button>
        
        <p><span class="category">Categories:</span> All,Classic</p>
        <p><span class="category">Shere:</span>fb, instagram </p>
        </div>
        </section>
        
        <section class="product-section d">
        <img src="src/img/home-page/pack-1.png" alt="" class="biggest-img" />
        
        <div class="product-description two">
        <h1>Adjustable Hook & Loop Fastener</h1>
        <h2
        >Fusce fermentum odio nec arcu. Praesent vestibulum dapibus nibh.
        Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat,
        pede. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
        enim. Phasellus dolor.</h2
        >
        <p>Buy Now</p>
        </div>
        </section>
        
        
        
        <section class="section-img">
        <img src="src/img/product-page/backpack.png" alt="" />
        </section>
        
        <div class="featured-section product">
        <h1 class="title">New Products</h1>
        <div class="row" id="featured">
        <div class="product product-page">
        <img src="src/img/home-page/pack-1.png" alt="" />
        <h2>Yoisy Travel Backpack</h2>
        <p>$82.00</p>
        </div>
        
        <div class="product product-page">
        <img src="src/img/home-page/pack-2.png" alt="" />
        <h2>Travel Backpack Peoad</h2>
        <p>$82.00</p>
        </div>
        
        <div class="product product-page">
        <img src="src/img/home-page/pack-3.png" alt="" />
        <h2>Scholar Satchel</h2>
        <p> $200.00</p>
        </div>
        </div>
        `;
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        main.innerHTML = '';
        main.insertAdjacentHTML('afterbegin', html);
      },
    };
    
    
    // after click add to card add product
    export const addProductToCard = async function () {
      Storage.saveProducts();
      const addBtn = document.querySelector('.add-to');
      addBtn.addEventListener('click', function () {
        const id = addBtn.id;
        
    CartLogic.openCard();
    CartLogic.summary(cart);
    CartLogic.click(id);
  });
};

//click events
bookmark.addEventListener('click', function (e) {
  let addAmount = e.target;
  let id = addAmount.id;
  let temp = cart.find((item) => item._id === id);

  // remove product x click
  if (e.target.classList.contains('x')) {
    temp.amount = 0;
    addAmount.parentElement.parentElement.remove();
    CartLogic.remove(id);
    CartLogic.summary(cart);
  }

  //up arrow click
  else if (e.target.classList.contains('fa-arrow-up')) {
    temp.amount = temp.amount + 1;

    CartLogic.setCardValue();
    Storage.saveCart(cart);
    document.querySelector(`.amount-${temp._id}`).innerHTML = temp.amount;
  }

  //down arrow click
  else if (e.target.classList.contains('fa-arrow-down')) {
    temp.amount = temp.amount - 1;
    CartLogic.setCardValue();
    Storage.saveCart(cart);
    document.querySelector(`.amount-${temp._id}`).innerHTML = temp.amount;
  } else if (e.target.classList.contains('continue-btn')) {
    CartLogic.hideCard();

    setTimeout(() => {
      swal('Thanks for buying!', 'Your pack will be soon', 'success');
      console.log('d');
    }, 1000);
  }
});

class CartLogic {
  static setCardValue() {
    const price = document.querySelector('.price');

    let tempTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
    });

    price.innerText = `Lączna wartość: ${parseFloat(tempTotal.toFixed(2))}`;
  }

  static click(id) {
    let cartItem = { ...Storage.getProduct(id), amount: 1 };
    let temp = cart.find((item) => item._id === id);

    let productCard = `
    <div class="item">
    <img src="${cartItem.img}" alt="" />
    <div>
    <h1>${cartItem.name}</h1>
    <h2>${cartItem.amount}xSZT</h2>
    </div>

    <div>
      <i class="fa fa-arrow-up" aria-hidden="true" id="${cartItem._id}"></i>
      <p class="amount-${cartItem._id}">${cartItem.amount}</p>
      <i class="fa fa-arrow-down down" aria-hidden="true" id="${cartItem._id}"></i>

    </div>

    <div class="remove-class">
    <i class="fa fa-times x" aria-hidden="true" id="${cartItem._id}"></i>
    <p class="price-ele">${cartItem.price} zł</p>
    </div>
    </div>
    `;

    if (temp) {
      temp.amount = temp.amount + 1;

      const pri = document.querySelector('.price');
      console.log([...cart].length);
      let val = parseFloat(pri.innerHTML.slice(16));

      CartLogic.setCardValue();
      Storage.saveCart(cart);
      document.querySelector(`.amount-${temp._id}`).innerHTML = temp.amount;
      document.querySelector('.price').innerHTML = `Lączna wartosc: ${
        temp.price * 1 + val
      } zł`;
    } else {
      cart = [...cart, cartItem];
      Storage.saveCart(cart);
      CartLogic.summary(cart);
      cartContainer.insertAdjacentHTML('afterbegin', productCard);
    }
  }

  static openCard() {
    bookmark.classList.remove('hidden');
    help.classList.add('to-left');
    nav.classList.add('to-left');
    help.classList.remove('to-right');
    nav.classList.remove('to-right');
  }

  static hideCard() {
    bookmark.classList.add('hidden');
    help.classList.remove('to-left');
    nav.classList.remove('to-left');
    help.classList.toggle('to-right');
    nav.classList.toggle('to-right');
  }

  static summary(cart) {
    console.log(cart);
    if (cart.length > 0) {
      const buttonsAndPrice = `
      <h1 class="price"></h1>
      <a href="#"><button class="continue-btn">Buy</button></a>`;

      summary.innerHTML = '';
      summary.innerHTML += buttonsAndPrice;
      CartLogic.setCardValue();
    } else {
      summary.innerHTML = '';
    }
  }
  static remove(id) {
    cart = cart.filter((item) => item._id != id);

    Storage.saveCart(cart);
    CartLogic.setCardValue();
  }
}

//Local storage object

class Storage {
  static async saveProducts() {
    

    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProduct(id) {

    return products.find((item) => item._id === id);
  }

  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getCard() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

// afrer load page
const settupAPP = function () {
  cart = Storage.getCard();

  CartLogic.summary(cart);
  populateCart(cart);
};

const populateCart = function (cart) {
  cart.forEach((item) => {
    const productCard = `
    <div class="item">
    <img src="${item.img}" alt="" />
    <div>
    <h1>${item.name}</h1>
    <h2>1xSZT</h2>
    </div>

    <div class="price-up">
    <i class="fa fa-arrow-up" id="${item._id}"></i>
    <p class="amount-${item._id}">${item.amount}</p>
    <i class="fa fa-arrow-down" id="${item._id}"></i>
    </div>

    <div class="remove-class">
    <i class="fa fa-times x" aria-hidden="true"  id="${item._id}"> </i>
    <p class="price-ele">${item.price} zł</p>
    </div>
    </div>
    `;

    cartContainer.insertAdjacentHTML('afterbegin', productCard);
  });
};

window.addEventListener('load', settupAPP);

export default ProductScreen;
