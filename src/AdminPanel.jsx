import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Verifica login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usuario) => {
      if (!usuario) {
        window.location.href = "/login";
      } else {
        setUser(usuario);
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

  // Deletar agendamento
  async function deleteAppointment(id) {
    await deleteDoc(doc(db, "appointments", id));
    loadAppointments();
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Painel Administrativo
