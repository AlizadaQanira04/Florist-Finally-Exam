let BASE_URL = `http://localhost:8080`;
let products = document.querySelector(".products");
let arr = [];
let allBtn = document.querySelector(".btn-all");
let btn2 = document.querySelector(".btn2");
let btn3 = document.querySelector(".btn3");
let btn4 = document.querySelector(".btn4");
let btn5 = document.querySelector(".btn5");
let btn6 = document.querySelector(".btn6");
async function getData() {
  let response = await axios(`${BASE_URL}/products`);
  console.log(response.data);
  arr = response.data;
  drawProduct(response.data);
}
getData();

allBtn.addEventListener("click", function () {
  // console.log(allBtn);
  drawProduct(arr);
});

btn2.addEventListener("click", function () {
  // console.log(btn2);
  let filtered = arr.filter(
    (item) => item.category.toLocaleLowerCase() === "bouquet"
  );
  drawProduct(filtered);
});
btn3.addEventListener("click", function () {
  // console.log(btn2);
  let filtered = arr.filter(
    (item) => item.category.toLocaleLowerCase() === "flower box"
  );
  drawProduct(filtered);
});
btn4.addEventListener("click", function () {
  // console.log(btn2);
  let filtered = arr.filter(
    (item) => item.category.toLocaleLowerCase() === "flower shelf"
  );
  drawProduct(filtered);
});
btn5.addEventListener("click", function () {
  // console.log(btn2);
  let filtered = arr.filter(
    (item) => item.category.toLocaleLowerCase() === "basket of flower"
  );
  drawProduct(filtered);
});
btn6.addEventListener("click", function () {
  // console.log(btn2);
  let filtered = arr.filter(
    (item) => item.category.toLocaleLowerCase() === "gift combos"
  );
  drawProduct(filtered);
});

function drawProduct(data) {
  products.innerHTML = "";
  data.forEach((element) => {
    products.innerHTML += `
    <div class="product">
    <img src="${element.imageUrl}" alt="" />
    <h4>${element.title}</h4>
    <p>$ ${element.price}</p>
    <a href="./details.html?id=${element.id}">LEARN MORE</a>
  </div>
    `;
  });
}
