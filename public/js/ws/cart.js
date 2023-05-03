const socket = io();

// pedido de productos
socket.emit("getItemsCart", userEmail);

// carga de productos
socket.on("itemsCart", (cartItems) => {
  const container = document.getElementById("cartItems");
  if(cartItems.length){
    const html = makeCartItemsTable(cartItems);
    const totalPrice = makeTotalPrice(cartItems);
    container.innerHTML = html + totalPrice;
    btnsDeleteCart();
    btnMakePurchase(userEmail);
  } else {
    const html = `<p>No hay productos en el carrito</p>`;
    container.innerHTML = html;
  } 
});

// eliminar un producto
function btnsDeleteCart() {
  const btnDeleteCartProduct = document.getElementsByClassName(
    "btnDeleteCartProduct"
  );
  for (let i = 0; i < btnDeleteCartProduct.length; i++) {
    btnDeleteCartProduct[i].addEventListener("click", async (e) => {
      const deleteProduct = {
        userEmail: userEmail,
        productID: e.target.id,
      };
      await socket.emit("deleteProduct", deleteProduct);
    });
  }
}

// realizar compra
function btnMakePurchase(userEmail) {
  const btnPurchase = document.getElementById('btnPurchase');
  btnPurchase.addEventListener('click', async(e) =>{
    socket.emit("makePruchase", userEmail);
  })
}

// compra realizada
socket.on("purchaseMade", () => {
  const container = document.getElementById("cartItems");
  const html = `<h3>¡Pedido realizado!</h3>`;
  container.innerHTML = html;
  }
);

function makeCartItemsTable(items) {
  const html = items
    .map((item) => {
      return `   <div id="pCart${item._id}" class="bg-light d-flex align-items-center m-3">
                    <div class="d-flex align-items-center">
                        <img src="${item.thumbnail}" class="image-fluid" width="10%">
                        <div class="p-3">
                            <h5 class="card-title">${item.product}</h5>
                            <p class="card-text">Cantidad: ${item.qty}</p>
                            <p class="card-text">$ ${item.price}</p>
                        </div>
                    </div>
                    <a id="${item._id}" class="btn btn-primary m-3 btnDeleteCartProduct">Eliminar</a>
                </div>`;
    })
    .join(" ");
  return html;
}

function makeTotalPrice(cartItems){
  const cartTotal = cartItems.reduce((total, currentValue)=> total + currentValue.price * currentValue.qty, 0);
  return `  <div class="d-flex align-items-center m-3">
              <h3><strong>Total: </strong>$ ${parseFloat(cartTotal).toFixed(2)}</h3>
              <a id="btnPurchase" class="btn btn-success m-3">Comprar</a>
            </div>`;
}
