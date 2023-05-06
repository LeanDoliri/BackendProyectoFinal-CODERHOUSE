import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const authUser = process.env.AUTH_EMAIL;
const authPass = process.env.AUTH_EMAIL_PASS;

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: authUser,
    pass: authPass,
  },
});

export function sendNewUserEmail(client) {
  const mailOptions = {
    from: "Servidor Node.js",
    to: authUser,
    subject: "Nuevo registro",
    html: `<h1>${client.name} se ha registrado.</h1>
        <p>Nombre: ${client.name}</p>
        <p>Direccion: ${client.adress}</p>
        <p>Edad: ${client.age}</p>
        <p>Telefono: ${client.phone}</p>
        <p>Email: ${client.email}</p>`,
  };

  transporter.sendMail(mailOptions);
}

export function sendNewPurchaseEmail(client, purchase) {
    const products = purchase.items.map(item => `${item.product} x ${item.qty}`);
    const productsMessage = products.join(", <br>");

    const mailOptions = {
      from: "Servidor Node.js",
      to: authUser,
      subject: `Nuevo pedido de ${client.name}`,
      html: `<h1>Nuevo pedido de ${client.name}</h1>
            <p><strong>Fecha del pedido: </strong> ${purchase.date}</p>
            <p><strong>Dirección de entrega: </strong> ${purchase.adress}</p>
            <p><strong>Productos: </strong></p> 
            <p>${productsMessage}</p>`,
    };
  
    transporter.sendMail(mailOptions);
}
