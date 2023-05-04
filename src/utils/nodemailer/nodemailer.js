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
    html: `<h1>${client.nombre} se ha registrado.</h1>
        <p>Nombre: ${client.nombre}</p>
        <p>Direccion: ${client.direccion}</p>
        <p>Edad: ${client.edad}</p>
        <p>Telefono: ${client.telefono}</p>
        <p>Email: ${client.email}</p>`,
  };

  transporter.sendMail(mailOptions);
}

export function sendNewPurchaseEmail(client, purchase) {
    const products = purchase.items.map((item) => item.product);
    const productsMessage = products.join(", <br>");

    const mailOptions = {
      from: "Servidor Node.js",
      to: authUser,
      subject: `Nuevo pedido de ${client.nombre}`,
      html: `<h1>Nuevo pedido de ${client.nombre}</h1>
          <p><strong>Productos: </strong> ${productsMessage}</p>`,
    };
  
    transporter.sendMail(mailOptions);
}
