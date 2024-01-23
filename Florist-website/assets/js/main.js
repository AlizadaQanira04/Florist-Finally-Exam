let BASE_URL = `http://localhost:8080`;
let products = document.querySelector(".products");
async function getData() {
  let response = await axios(`${BASE_URL}/products`);
  console.log(response.data);
  drawProduct(response.data)
}
getData();

function drawProduct(data) {
  products.innerHTML = "";
  data.forEach(element => {
    products.innerHTML+=`
    <div class="product">
    <img src="${element.imageUrl}" alt="" />
    <h3>${element.title}</h3>
    <p>$ ${element.price}</p>
    <a href="./details.html?id=${element.id}">LEARN MORE</a>
  </div>
    `
  });
}
