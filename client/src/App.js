import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";

function App() {
  const [keys, setKeys] = useState({});

  const [message, setMessage] = useState("");

  const [cipherText, setCipherText] = useState("");
  const [decipherText, setDecipherText] = useState("");
  const [signedText, setSignedText] = useState("");
  const [signature, setSignature] = useState("");

  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  useEffect(() => {
    axios
      .get("/keys")
      .then((res) => {
        console.log(res.data);
        setKeys(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function encrypt() {
    setLoading(true);
    axios
      .post("/encrypt", {
        message,
        keys: { number1, number2 },
      })
      .then((res) => {
        console.log(res.data);
        setCipherText(res.data?.cipherText);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function decrypt() {
    setLoading2(true);
    axios
      .post("/decrypt", {
        message,
        keys: { number1, number2 },
      })
      .then((res) => {
        console.log(res.data);
        setDecipherText(res.data?.decipherText);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading2(false);
      });
  }

  function sign() {
    setLoading3(true);
    axios
      .post("/sign", {
        message,
        keys: { number1, number2 },
      })
      .then((res) => {
        console.log(res.data);
        setSignedText(res.data?.signedText);
        setSignature(res.data?.signature);
        setLoading3(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading3(false);
      });
  }

  function verify() {
    setLoading4(true);
    axios
      .post("/verify", {
        message,
        keys: { number1, number2 },
        signedText: signedText,
        signature: signature,
      })
      .then((res) => {
        console.log(res.data);
        let is_verified = res.data.is_verified;
        if (is_verified) {
          toast.success("🦄 Assinatura verifica com sucesso!", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(
            `💩 Erro! Os dados não batem assinatura não verificada!`,
            {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
        setLoading4(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading4(false);
      });
  }

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Gerador/Verificador de Assinaturas RSA</h1>
        <p className="lead">
          Trabalho de Segurança computacional - gerador e verificador de
          assinaturas RSA em arquivos.
        </p>
        <hr className="my-4"></hr>

        <blockquote className="blockquote">
          <p className="mb-0">Chaves</p>
          <footer className="blockquote-footer">
            a chave <b>Pública</b> é formada por [n, e] e a <b>Privada</b> é
            formada por [n, d]
          </footer>
        </blockquote>
        <div className="d-flex justify-content-between">
          <div
            className="form-group select"
            style={{ width: "33%" }}
            onClick={() => setNumber1(keys.n)}
          >
            <label htmlFor="pub">
              <b>N</b>
            </label>
            <textarea
              style={{ backgroundColor: "white" }}
              value={keys.n}
              disabled={true}
              className="form-control"
              rows="8"
              id="pub"
            ></textarea>
          </div>
          <div
            className="form-group select"
            style={{ width: "33%" }}
            onClick={() => setNumber2(keys.e)}
          >
            <label htmlFor="pub">
              <b>E</b>
            </label>
            <textarea
              style={{ backgroundColor: "white" }}
              value={keys.e}
              disabled={true}
              className="form-control"
              rows="8"
              id="pub"
            ></textarea>
          </div>
          <div
            className="form-group select"
            style={{ width: "33%" }}
            onClick={() => setNumber2(keys.d)}
          >
            <label htmlFor="priv">
              <b>D</b>
            </label>
            <textarea
              style={{ backgroundColor: "white" }}
              value={keys.d}
              disabled={true}
              className="form-control"
              rows="8"
              id="priv"
            ></textarea>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-primary btn-lg"
          >
            <>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-repeat"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
              {`  `}
              gerar outra chave
            </>
          </button>
        </div>

        <div className="d-flex justify-content-between">
          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="pub">
              <b>N</b>
            </label>
            <textarea
              style={{ backgroundColor: "white" }}
              value={number1}
              onChange={(e) => setNumber1(e.target.value)}
              className="form-control"
              rows="3"
              id="pub"
            ></textarea>
          </div>
          <div className="form-group" style={{ width: "48%" }}>
            <label htmlFor="pub">
              <b> E ou D</b>
            </label>
            <textarea
              style={{ backgroundColor: "white" }}
              value={number2}
              onChange={(e) => setNumber2(e.target.value)}
              className="form-control"
              rows="3"
              id="pub"
            ></textarea>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            <b>Insira a mensagem</b>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
          ></textarea>
        </div>

        <div className="d-flex justify-content-end">
          <button
            onClick={() => encrypt()}
            className="btn btn-primary btn-lg"
            disabled={
              message?.length <= 0 ||
              number1?.length <= 0 ||
              number2?.length <= 0
            }
            style={{ marginRight: "1rem" }}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-lock-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                  <path
                    fillRule="evenodd"
                    d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"
                  />
                </svg>
                {`  `}
                cifrar mensagem
              </>
            )}
          </button>
          <button
            onClick={() => decrypt()}
            className="btn btn-primary btn-lg"
            disabled={
              message?.length <= 0 ||
              number1?.length <= 0 ||
              number2?.length <= 0
            }
            style={{ marginRight: "1rem" }}
          >
            {loading2 ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-unlock-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                  <path
                    fillRule="evenodd"
                    d="M8.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"
                  />
                </svg>
                {`  `}
                decifrar mensagem
              </>
            )}
          </button>
          <button
            onClick={() => sign()}
            className="btn btn-primary btn-lg"
            disabled={
              message?.length <= 0 ||
              number1?.length <= 0 ||
              number2?.length <= 0
            }
            style={{ marginRight: "1rem" }}
          >
            {loading3 ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-key-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                </svg>
                {`  `}
                assinar mensagem
              </>
            )}
          </button>
        </div>

        {cipherText ? (
          <div className="form-group">
            <label htmlFor="encrypted">
              <b>Mensagem cifrada </b>
            </label>
            <textarea
              style={{ backgroundColor: "white" }}
              value={cipherText}
              disabled={true}
              className="form-control"
              rows="5"
              id="encrypted"
            ></textarea>
          </div>
        ) : undefined}

        {decipherText ? (
          <div className="form-group">
            <label htmlFor="encrypted">
              <b>Mensagem decifrada </b>
            </label>
            <textarea
              style={{ backgroundColor: "white" }}
              value={decipherText}
              disabled={true}
              className="form-control"
              rows="5"
              id="encrypted"
            ></textarea>
          </div>
        ) : undefined}

        {signedText ? (
          <>
            <div className="form-group">
              <label htmlFor="encrypted">
                <b>Mensagem assinada </b>
              </label>
              <textarea
                style={{ backgroundColor: "white" }}
                value={signedText}
                onChange={(e) => setSignedText(e.target.value)}
                className="form-control"
                rows="3"
                id="encrypted"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="encrypted">
                <b>Assinatura </b>
              </label>
              <textarea
                style={{ backgroundColor: "white" }}
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="form-control"
                rows="3"
                id="encrypted"
              ></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button
                onClick={() => verify()}
                className="btn btn-primary btn-lg"
                disabled={
                  message?.length <= 0 ||
                  number1?.length <= 0 ||
                  number2?.length <= 0
                }
                style={{ marginRight: "1rem" }}
              >
                {loading4 ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-check"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                      />
                    </svg>
                    {`  `}
                    verificar assinatura
                  </>
                )}
              </button>
            </div>
          </>
        ) : undefined}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
