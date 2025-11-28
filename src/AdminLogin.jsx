import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const fazerLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = "/painel";
    } catch (err) {
      setErro("Email ou senha incorretos");
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Painel da Dona</h2>

      <form onSubmit={fazerLogin} style={{ marginTop: 20 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, width: 250, display: "block", margin: "10px auto" }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: 10, width: 250, display: "block", margin: "10px auto" }}
        />

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <button
          type="submit"
          style={{
            padding: 10,
            width: 250,
            background: "hotpink",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginTop: 10
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
