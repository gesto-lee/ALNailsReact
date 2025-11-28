import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (!usuario) {
        window.location.href = "/login";
      } else {
        setUser(usuario);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "appointments"), orderBy("data", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgendamentos(lista);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Painel da Dona</h2>
      <p>Logada como: {user?.email}</p>

      <button onClick={() => signOut(auth)}>Sair</button>

      <h3>Todos os Agendamentos</h3>

      {agendamentos.length === 0 && <p>Nenhum agendamento encontrado.</p>}

      {agendamentos.map((ag) => (
        <div key={ag.id} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
          <strong>{ag.nome}</strong> → {ag.servico} <br />
          Telefone: {ag.telefone} <br />
          Data: {ag.data} — Hora: {ag.hora}
        </div>
      ))}
    </div>
  );
}
