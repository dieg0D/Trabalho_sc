// Biblioteca de utilidades Para trabalhar com BIGINT ex: geração de primos, calculo de gcd, mod_inverse, mod_pow etc...
const { prime, gcd, modInv, modPow } = require("bigint-crypto-utils");
const { createHash } = require("crypto");

// Função que gera duas chaves (Pública e Privada) com base na especificação do RSA
async function generate_keys() {
  // Geração dos primos P e Q
  const p = await prime(1024);
  const q = await prime(1024);

  // calculo do N = P * Q
  const n = p * q;

  // Função de totiente phi(n) = (p -1) * (q -1)
  totient = (p - BigInt(1)) * (q - BigInt(1));

  // Geração do e que tem que ser um numero co-primo de totient porém  ele tem que ser menor que totient.
  var e = await prime(1024);
  while (gcd(totient, e) > BigInt(1)) {
    e = e + BigInt(1);
  }

  // Calcula o d que é e mod_inverso totient
  const d = await modInv(e, totient);

  // Aqui são criadas as daus chaves publica e privada
  const pub = [n, e];
  const priv = [n, d];

  // Retorna um um objeto que contém elas
  return { pub, priv };
}

// Função que cifra o plainText ou seja plaintext ^ e  mod n
async function encrypt(key, plaintext) {
  const n = key[0];
  const e = key[1];

  const ciphertext = await modPow(plaintext, e, n);

  return ciphertext;
}

// Função que decifra a mensagem  ou seja ciphertext ^ d mod n
async function decrypt(key, ciphertext) {
  const n = key[0];
  const d = key[1];

  const plaintext = await modPow(ciphertext, d, n);

  return plaintext;
}

// Função que codifica a mensagem de string para um BigInt basicamente pega o charCode de cada caractere e da join fazendo um numero grandão
function encode(str) {
  const msg = str
    .split("")
    .map((i) => i.charCodeAt())
    .join("");

  return BigInt(msg);
}

// Função que decodifica um número e recupera sua string basicamente o caminho inverso da função anterior
function decode(code) {
  const stringified = code.toString();
  let string = "";

  for (let i = 0; i < stringified.length; i += 2) {
    let num = Number(stringified.substr(i, 2));

    // verificação para poder tratar caracteres especiais.
    if (num <= 30) {
      string += String.fromCharCode(Number(stringified.substr(i, 3)));
      i++;
    } else {
      string += String.fromCharCode(num);
    }
  }

  return string;
}

// Função que assina uma mensagem utilizando a chave privada e retorna a cifra gerada e uma hash da mensagem
async function sign(key, message) {
  const n = key[0];
  const d = key[1];

  const signedtext = await modPow(message, d, n);

  const hash = createHash("sha256").update(signedtext.toString()).digest("hex");

  return { signature: hash, signedtext: signedtext };
}

// Função que verifica assinatura fazendo a comparação de hashes e utilizando a chave pública para decifrar a mensagem
async function verify(key, message, ciphertext, signature) {
  const n = key[0];
  const e = key[1];

  const hash = createHash("sha256").update(ciphertext.toString()).digest("hex");

  if (hash === signature) {
    const plaintext = await modPow(ciphertext, e, n);

    const decodeText = decode(plaintext);

    if (message === decodeText.toString()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Exportação das funções para elas serem utilizadas em outro arquivo
exports.generate_keys = generate_keys;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.encode = encode;
exports.decode = decode;
exports.sign = sign;
exports.verify = verify;
