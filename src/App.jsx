// src/App.jsx
import React, { useState, useEffect } from "react";
import "./styles.css";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

/* === CONFIGURAÇÃO === */
const BUSINESS_WHATSAPP = "5562982097833";
const OWNER_WHATSAPP = BUSINESS_WHATSAPP;
/* ====================== */

const TIME_SLOTS = ["08:00", "10:00", "12:00", "14:00", "16:00"];
const SERVICES = [
  "Manicure",
  "Pedicure completo",
  "Unhas em Gel",
  "Alongamento de Unhas",
  "Manutenção em Fibra",
  "Blindagem",
  "Outro (WhatsApp)",
];

export default function App() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [booked, setBooked] = useState([]);

  // AGENDAMENTOS VISÍVEIS PARA O CLIENTE
  const [clientAppointments, setClientAppointments] = useState([]);
  const [loadingNext, setLoadingNext] = useState(true);

  // Carregar somente agendamentos do cliente
  useEffect(() => {
    async function loadClientAppointments() {
      try {
        const col = collection(db, "appointments");
        const q = query(
          col,
          where("phone", "==", telefone.trim()),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);
        const items = [];
        snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));

        setClientAppointments(items.slice(0, 5)); // até 5 por segurança
      } catch (err) {
        console.error("Erro ao carregar agendamentos:", err);
      } finally {
        setLoadingNext(false);
      }
    }

    if (telefone.length >= 10) {
      loadClientAppointments();
    }
  }, [telefone]);

  // Carregar horários ocupados da data selecionada
  useEffect(() => {
    async function loadBooked() {
      setBooked([]);

      if (!data) return;

      try {
        const col = collection(db, "appointments");
        const q = query(col, where("dateKey", "==", data));
        const snap = await getDocs(q);

        const slots = [];
        snap.forEach((d) => {
          const dd = d.data();
          if (dd.time) slots.push(dd.time);
        });

        setBooked(slots);
      } catch (err) {
        console.error("Erro ao carregar horários:", err);
      }
    }

    loadBooked();
  }, [data]);

  const openWhatsApp = (phone, text) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  const handleServiceChange = (e) => {
    const val = e.target.value;
    setServico(val);

    if (val === "Outro (WhatsApp)") {
      openWhatsApp(
        BUSINESS_WHATSAPP,
        "Olá! Gostaria de saber sobre outros serviços."
      );
    }
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    // BLOQUEAR DATA PASSADA
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const [ano, mes, dia] = data.split("-");
    const dataAgendada = new Date(ano, mes - 1, dia);

    if (dataAgendada < hoje) {
      alert("Não é possível agendar uma data que já passou.");
      return;
    }

    // BLOQUEAR HORA PASSADA HOJE
    if (dataAgendada.getTime() === hoje.getTime()) {
      const agora = new Date();
      const [h, m] = hora.split(":");

      const horarioAgendado = new Date();
      horarioAgendado.setHours(h, m, 0, 0);

      if (horarioAgendado <= agora) {
        alert("Não é possível agendar um horário que já passou hoje.");
        return;
      }
    }

    // VALIDAÇÕES BÁSICAS
    if (!nome || !telefone || !servico || !data || !hora) {
      alert("Preencha todos os campos!");
      return;
    }

    // BLOQUEAR HORÁRIO JÁ RESERVADO
    if (booked.includes(hora)) {
      alert("Esse horário já está reservado.");
      return;
    }

    // IMPEDIR O MESMO CLIENTE DE MARCAR O MESMO HORÁRIO NO MESMO DIA
    const colCheck = collection(db, "appointments");
    const qCheck = query(
      colCheck,
      where("phone", "==", telefone.trim()),
      where("date", "==", data),
      where("time", "==", hora)
    );

    const snapCheck = await getDocs(qCheck);
    if (!snapCheck.empty) {
      alert("Você já possui um agendamento neste horário!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        name: nome.trim(),
        phone: telefone.trim(),
        service: servico,
        date: data,
        time: hora,
        dateKey: data,
        createdAt: serverTimestamp(),
      });

      openWhatsApp(
        OWNER_WHATSAPP,
        `Novo agendamento:
Nome: ${nome}
Telefone: ${telefone}
Serviço: ${servico}
Data: ${data}
Hora: ${hora}
ID: ${docRef.id}`
      );

      alert("Agendamento realizado com sucesso!");

      setNome("");
      setTelefone("");
      setServico("");
      setData("");
      setHora("");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao enviar.");
    }
  };

  return (
    <div className="container-principal">
      <header className="logo-header">
        <h1 className="app-logo">
          <span className="logo-emoji">💅</span>
          <span className="app-title">AL Nails Designers</span>
          <span className="logo-emoji">💅</span>
        </h1>

        <p className="telefone-topo">
          Feedback:
          <a
            className="zap-link"
            href={`https://wa.me/${BUSINESS_WHATSAPP}`}
            target="_blank"
          >
            <span className="telefone-text">(62) 98209-7833</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              className="whatsapp-icon-svg"
              alt="WhatsApp"
            />
          </a>
        </p>
      </header>

      <main className="card-agendamento">
        <h2>Agende o seu Horário sem Complicação</h2>

        <form onSubmit={enviarFormulario} className="form">
          <label>Nome Completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome da cliente"
          />

          <label>Telefone (DDD + Número)</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Ex: 5562999999999"
          />

          <label>Serviço Desejado</label>
          <select value={servico} onChange={handleServiceChange}>
            <option value="">-- Selecione o Serviço --</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <label>Hora</label>
          <select value={hora} onChange={(e) => setHora(e.target.value)}>
            <option value="">-- Selecionar hora --</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t} disabled={booked.includes(t)}>
                {t} {booked.includes(t) ? "(ocupado)" : ""}
              </option>
            ))}
          </select>

          <button className="botao-confirmar" type="submit">
            CONFIRMAR AGENDAMENTO
          </button>
        </form>

        <section className="lista-agendamentos">
          <h3>Seus Próximos Agendamentos</h3>

          {loadingNext ? (
            <p>Carregando...</p>
          ) : clientAppointments.length === 0 ? (
            <p>Nenhum agendamento encontrado</p>
          ) : (
            <ul>
              {clientAppointments.map((a) => (
                <li key={a.id}>
                  <strong>{a.service}</strong> — {a.date} às {a.time}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
