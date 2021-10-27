
import { pro } from "../data.js";


let products = pro();

const main = document.querySelector('.help');
const bag = document.querySelector('.fa-shopping-bag');
const help = document.querySelector('.help');
const nav = document.querySelector('.nav-bar');
const bookmark = document.querySelector('.bookmark');
const x = document.getElementById('x');

const HomeScreen = {
  renderHtml: async () => {
    // const products = await getProduct();

    const html = `

    <header class="header">

    <div class="flex-container">
    
    <h1>New Backpack Adventure</h1>
    <p>DETAIL DEFINED</p>
    <button class="header-btn">Shop now</button>
      
    </div>
    </header>
    <div class="featured-section">
    <h1 class="title"> Latest Products </h1>
    <div class="row" id="featured">
    ${products.map(
        (product) => `
        <div class="product">
            <a href="/frontend/#/product/${product._id}">
              <img src="${product.img}" alt="" />
            </a>
              <h2>${product.name}</h2>
              <p>${product.price}$</p>
            </div>
              `
      )}
    </div>
    </div>

    <section class="big-picture"> </section>

    <div class="featured-section">
      <h1 class="title">Best Products</h1>
      <div class="row" id="featured">
 
     
          

      </div>
    </div>
    

    `;

    main.innerHTML = '';
    main.insertAdjacentHTML('afterbegin', html);
  },
};

//move shopping card
export const shoppingCard = () => {
  bag.addEventListener('click', function () {
    bookmark.classList.toggle('hidden');
    help.classList.toggle('to-left');
    nav.classList.toggle('to-left');
    help.classList.toggle('to-right');
    nav.classList.toggle('to-right');
  });

  x.addEventListener('click', function () {
    bookmark.classList.add('hidden');
    help.classList.remove('to-left');
    nav.classList.remove('to-left');
    help.classList.toggle('to-right');
    nav.classList.toggle('to-right');
  });
};

export default HomeScreen;


// ${products.map(
//   // <img src="src/img/home-page/arr-right.png" alt="" class="header-arr left">
//   // <img src="src/img/home-page/arr-right.png" alt="" class="header-arr right">
//   (product) => `
//   <div class="product">
//       <a href="/frontend/#/product/${product._id}">
//         <img src="${product.img}" alt="" />
//       </a>
//         <h2>${product.name}</h2>
//         <p>${product.price}$</p>
//       </div>
//         `
// )}