import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verifica se está logado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login";
      }
    });

    return () => unsub();
  }, []);

  // Carrega agendamentos
  async function loadAppointments() {
    setLoading(true);
    const snap = await getDocs(collection(db, "appointments"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setAppointments(list);
    setLoading(false);
  }

  async function deleteAppointment(id) {
    await deleteDoc(doc(db, "appointments", id));
    loadAppointments();
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Painel Administrativo</h1>

      <button onClick={() => signOut(auth)} style={styles.logoutButton}>
        Sair
      </button>

      <h2 style={styles.subtitle}>Agendamentos</h2>

      {loading ? (
        <p style={styles.loading}>Carregando...</p>
      ) : appointments.length === 0 ? (
        <p style={styles.noData}>Nenhum agendamento encontrado.</p>
      ) : (
        <div style={styles.cardContainer}>
          {appointments.map((a) => (
            <div key={a.id} style={styles.card}>
              <p><b>Nome:</b> {a.name}</p>
              <p><b>Telefone:</b> {a.phone}</p>
              <p><b>Serviço:</b> {a.service}</p>
              <p><b>Data:</b> {a.date}</p>
              <p><b>Hora:</b> {a.time}</p>

              <button
                onClick={() => deleteAppointment(a.id)}
                style={styles.deleteBtn}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#ffe4f2",
    minHeight: "100vh",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#d63384",
  },
  subtitle: {
    marginTop: "20px",
    fontSize: "22px",
    color: "#b30059",
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
    marginTop: "20px",
  },
  noData: {
    textAlign: "center",
    marginTop: "20px",
    color: "#555",
  },
  logoutButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    background: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  cardContainer: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
  deleteBtn: {
    marginTop: "10px",
    background: "#ff4d4d",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
};
