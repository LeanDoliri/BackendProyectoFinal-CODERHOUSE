const socket = io();

// pedido de productos
socket.emit("getProducts");

// carga de productos
socket.on("products", (products) => {
  const container = document.getElementById("products");
  const html = makeProductsTable(products);
  container.innerHTML = html;
  btsAddToCart();
});

// agregar producto al carrito
function btsAddToCart() {
  const btnAddToCartList = document.getElementsByClassName("btnAddToCart");
  for (let i = 0; i < btnAddToCartList.length; i++) {
    btnAddToCartList[i].addEventListener("click", async (e) => {
      const addingProduct = {
        userEmail: userEmail,
        productID: e.target.id,
      };
      
      await socket.emit("addProduct", addingProduct);
    });
  }
}

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
                  <button type="button" class="btn btn-primary btnAddToCart" id='${item._id}'>
                    Add to cart
                  </button>
                </div>
              </div> `;
    })
    .join(" ");
  return html;
}
