// async function main() {
//   // Mensagem que vai ser cifrada
//   const message = "Hello, World!";

//   // Geração das chaves Pública e Privada
//   const keys = await generate_keys();

//   // codificar msg -> cifrar -> decifrar ->
//   const encoded_message = encode(message);
//   const encrypted_message = await encrypt(keys.pub, encoded_message);
//   const decrypted_message = await decrypt(keys.priv, encrypted_message);
//   const decoded_message = decode(decrypted_message);

//   console.log("Mensagem original: ", message, "\n");

//   console.log("Chaves");
//   console.log("n: ", keys.priv[0].toString());
//   console.log("d: ", keys.priv[1].toString());
//   console.log("e: ", keys.pub[0].toString(), "\n");

//   console.log("Mensagem convertida para número: ", encoded_message.toString());
//   console.log("Mensagem cifrada: ", encrypted_message.toString());
//   console.log("Mensagem decifrada: ", decrypted_message.toString());
//   console.log(
//     "Mensagem convertida de volta para texto: ",
//     decoded_message.toString()
//   );
// }