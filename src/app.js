const {
  generate_keys,
  encrypt,
  decrypt,
  encode,
  decode,
  sign,
  verify,
} = require("./RSA.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

async function main() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  router.get("/keys", async function (req, res) {
    const keys = await generate_keys();
    res.send({
      n: keys.priv[0].toString(),
      d: keys.priv[1].toString(),
      e: keys.pub[1].toString(),
    });
  });

  router.post("/encrypt", async function (req, res) {
    const { message, keys } = req.body;

    const encodedMessage = encode(message);
    const cipherText = await encrypt(
      [BigInt(keys.number1), BigInt(keys.number2)],
      encodedMessage
    );

    res.send({
      cipherText: cipherText.toString(),
    });
  });

  router.post("/decrypt", async function (req, res) {
    const { message, keys } = req.body;

    const decryptedMessage = await decrypt(
      [BigInt(keys.number1), BigInt(keys.number2)],
      message
    );

    const decipherText = decode(decryptedMessage);

    res.send({
      decipherText: decipherText.toString(),
    });
  });

  router.post("/sign", async function (req, res) {
    const { message, keys } = req.body;

    const encodedMessage = encode(message);

    const { signature, signedtext } = await sign(
      [BigInt(keys.number1), BigInt(keys.number2)],
      encodedMessage
    );

    res.send({
      signedText: signedtext.toString(),
      signature: signature,
    });
  });

  router.post("/verify", async function (req, res) {
    const { message, keys, signedText, signature } = req.body;

    const is_verified = await verify(
      [BigInt(keys.number1), BigInt(keys.number2)],
      message,
      signedText.toString("base64"),
      signature
    );

    res.send({
      is_verified,
    });
  });

  app.use("/", router);
}
main();

exports.app = app;
