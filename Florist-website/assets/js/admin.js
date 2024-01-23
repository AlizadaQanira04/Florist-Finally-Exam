let BASE_URL = `http://localhost:8080`;
let tBody = document.querySelector("tbody");
let numberAsc = document.querySelector(".number-asc");
let ascBtn = document.querySelector(".asc-button");
let form = document.querySelector("form");
let allInputs = document.querySelectorAll("input");
let editId = null;
let arr = [];
async function getData() {
  let response = await axios(`${BASE_URL}/products`);
  console.log(response.data);
  arr = response.data;
  drawTable(response.data);
}
getData();
//DRAWTABLE
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
    <td><button class="delete-button" onclick=deleteProduct("${element.id}",this)>DELETE</button></td>
    <td><button class="edit-button" onclick=editProduct("${element.id}")>EDIT</button></td>
    `;
    tBody.append(trElement);
  });
}
//DELETE
async function deleteProduct(id, btn) {
  if (confirm("do you want delete this product??")) {
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.closest.remove();
  }
}
//ACS
ascBtn.addEventListener("click", function () {
  if (ascBtn.innerText === "A-Z") {
    ascBtn.innerText = "Z-A";
    let sorted = arr.sort((a, b) => (a.title > b.title ? 1 : -1));
    drawTable(sorted);
  } else {
    ascBtn.innerText = "A-Z";
    let sorted = arr.sort((a, b) => (a.title < b.title ? 1 : -1));
    drawTable(sorted);
  }
});
numberAsc.addEventListener("click", function () {
  if (ascBtn.innerText === "ASC") {
    ascBtn.innerText = "DSC";
    let sorted = arr.sort((a, b) => a.price - b.price);
    drawTable(sorted);
  } else {
    ascBtn.innerText = "ASC";
    let sorted = arr.sort((a, b) => b.price - a.price);
    drawTable(sorted);
  }
});

//FORM
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const obj = {
    imageUrl: allInputs[0].value,
    title: allInputs[1].value,
    category: allInputs[2].value,
    price: allInputs[3].value,
  };
  if (
    allInputs[0].value &&
    allInputs[1].value &&
    allInputs[2].value &&
    allInputs[3].value
  ) {
    if (!editId) {
      await axios.post(`${BASE_URL}/products`, obj);
    } else {
      await axios.patch(`${BASE_URL}/products/${editId}`, obj);
    }
  } else {
    window.alert("what do you  do!!!?");
  }
  allInputs.forEach((item) => (item.value = ""));
});
async function editProduct(id) {
  editId = id;
  window.scrollTo(0, 0);
  let response = await axios(`${BASE_URL}/products/${id}`);
  (allInputs[0].value = response.data.imageUrl),
    (allInputs[1].value = response.data.title),
    (allInputs[2].value = response.data.category),
    (allInputs[3].value = response.data.price);
}
//SEARCH
let search = document.querySelector(".search-inp");
search.addEventListener("input", function (e) {
  let filtered = arr.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});
