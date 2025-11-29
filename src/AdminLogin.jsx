<<<<<<< HEAD
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

// IMPORTAÇÃO CORRETA DO FIREBASE
import { auth } from "./firebase";

function AdminLogin() {
=======
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function AdminLogin() {
>>>>>>> c721d277c266fac60590c65ee57e191e11267953
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const fazerLogin = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setErro("");

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso!");
      window.location.href = "/painel"; // redireciona após login
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Email ou senha inválidos.");
=======
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = "/painel";
    } catch (err) {
      setErro("Email ou senha incorretos");
>>>>>>> c721d277c266fac60590c65ee57e191e11267953
    }
  };

  return (
<<<<<<< HEAD
    <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center" }}>
      <h2>Painel Administrativo</h2>

      <form onSubmit={fazerLogin}>
=======
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Painel da Dona</h2>

      <form onSubmit={fazerLogin} style={{ marginTop: 20 }}>
>>>>>>> c721d277c266fac60590c65ee57e191e11267953
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
=======
          style={{ padding: 10, width: 250, display: "block", margin: "10px auto" }}
>>>>>>> c721d277c266fac60590c65ee57e191e11267953
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
<<<<<<< HEAD
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
=======
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
>>>>>>> c721d277c266fac60590c65ee57e191e11267953
          }}
        >
          Entrar
        </button>
      </form>
<<<<<<< HEAD

      {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}
    </div>
  );
}

export default AdminLogin;
=======
    </div>
  );
}
>>>>>>> c721d277c266fac60590c65ee57e191e11267953
