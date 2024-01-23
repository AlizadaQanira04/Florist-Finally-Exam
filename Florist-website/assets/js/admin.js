let BASE_URL = `http://localhost:8080`;
let tBody = document.querySelector("tbody");
let search = document.querySelector(".search");
let ascBtn = document.querySelector(".asc-button");
let form = document.querySelector("form");
let allInputs=document.querySelectorAll("input")
let arr = [];
async function getData() {
  let response = await axios(`${BASE_URL}/products`);
  console.log(response.data);
  arr = response.data;
  drawTable(response.data);
}
getData();

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td>${element.id}</td>
    <td> <img src="${element.imageUrl}" alt=""></td>
    <td>${element.title}</td>
    <td>${element.price}</td>
    <td>${element.category}</td>
    <td><button class="delete-button">DELETE</button></td>
    <td><button class="edit-button">EDIT</button></td>
    `;
    tBody.append(trElement);
  });
}
search.addEventListener("input", function (e) {
  let filtered = arr.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});
ascBtn.addEventListener("click", function () {
  if (ascBtn.innerText === "ASC") {
    ascBtn.innerText = "DSC";
    let sorted = arr.sort((a, b) => (a.title > b.title ? 1 : -1));
    drawTable(sorted);
  } else {
    ascBtn.innerText = "ASC";
    let sorted = arr.sort((a, b) => (a.title < b.title ? 1 : -1));
    drawTable(sorted);
  }
});
