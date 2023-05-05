const socket = io();

// pedido de productos
socket.emit("getProducts");

// carga de productos
socket.on("products", (products) => {
  const container = document.getElementById("products");
  const html = makeProductsTable(products);
  container.innerHTML = html;
});

// producto agregado
socket.on("addedProduct", () =>{
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
})

function makeProductsTable(items) {
  const html = items
    .map((item) => {
      return ` <div class="card m-3" style="width: 18rem;">
                <img src='${item.thumbnail}' class="card-img-top">
                <div class="card-body">
                  <h3 class="card-title">${item.product}</h3>
                  <h5 class="card-title">$ ${item.price}</h5>
                  <a href="/admin/update/${item._id}"><button type="button" class="btn btn-primary btnAddToCart" id='${item._id}'>
                    Update
                  </button></a>
                </div>
              </div> `;
    })
    .join(" ");
  return html;
}
