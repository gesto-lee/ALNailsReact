
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

// IMPORTAÇÃO CORRETA DO FIREBASE
import { auth } from "./firebase";

function AdminLogin() {
import { useState } from "react";
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
      alert("Login realizado com sucesso!");
      window.location.href = "/painel"; // redireciona após login
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Email ou senha inválidos.");
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = "/painel";
    } catch (err) {
      setErro("Email ou senha incorretos");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center" }}>
      <h2>Painel Administrativo</h2>

      <form onSubmit={fazerLogin}>
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Painel da Dona</h2>

      <form onSubmit={fazerLogin} style={{ marginTop: 20 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          style={{ padding: 10, width: 250, display: "block", margin: "10px auto" }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
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

      {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}
    </div>
  );
}

export default AdminLogin;
    </div>
  );
}

