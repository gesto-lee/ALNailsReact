import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const fazerLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = "/painel"; // redireciona ao painel
    } catch (err) {
      console.error("Erro no login:", err);
      setErro("Email ou senha incorretos.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h2>Painel da Dona</h2>

      <form onSubmit={fazerLogin} style={{ marginTop: 20 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 10,
            width: "100%",
            marginBottom: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            padding: 10,
            width: "100%",
            marginBottom: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: 12,
            width: "100%",
            background: "hotpink",
            border: "none",
            color: "white",
            fontWeight: "bold",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>

      {erro && (
        <p style={{ color: "red", marginTop: 10, fontWeight: "bold" }}>{erro}</p>
      )}
    </div>
  );
}
