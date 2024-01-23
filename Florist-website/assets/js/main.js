let BASE_URL = `http://localhost:8080`;
let products = document.querySelector(".products");
let arr = [];
let allBtn = document.querySelector(".btn-all");
let btn2 = document.querySelector(".btn1");
let btn3 = document.querySelector(".btn2");
let btn4 = document.querySelector(".btn3");
let btn5 = document.querySelector(".btn4");
let btn6 = document.querySelector(".btn5");
async function getData() {
  let response = await axios(`${BASE_URL}/products`);
  console.log(response.data);
  arr = response.data;
  drawProduct(response.data);
}
getData();
// allBtn.addEventListener("click", function () {
//   drawProduct(arr);
// });

// btn2.addEventListener("click", function () {
//   let filtered = arr.filter(
//     (item) => item.category.toLocaleLowerCase() === "Bouquet"
//   );
//   drawProduct(filtered);
// });

function drawProduct(data) {
  products.innerHTML = "";
  data.forEach((element) => {
    products.innerHTML += `
    <div class="product">
    <img src="${element.imageUrl}" alt="" />
    <h3>${element.title}</h3>
    <p>$ ${element.price}</p>
    <a href="./details.html?id=${element.id}">LEARN MORE</a>
  </div>
    `;
  });
}
