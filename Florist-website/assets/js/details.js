let BASE_URL = `http://localhost:8080`;
let product = document.querySelector(".product");
let id = new URLSearchParams(window.location.search).get("id");
async function getData() {
  let response = await axios(`${BASE_URL}/products/${id}`);
  console.log(response.data);
  drawProduct(response.data);
}
getData();

function drawProduct(element) {
  product.innerHTML += `
      <div class="product">
      <img src="${element.imageUrl}" alt="" />
      <h3>${element.title}</h3>
      <p>$ ${element.price}</p>
      <button onclick=(window.history.back())>BACK</button>
    </div>
      `;
}
