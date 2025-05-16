import React, { useEffect, useState } from "react";
import { getPerguntas, getRespostas, criarPergunta, criarResposta } from "../services/faqService";

export default function FaqPage() {
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [perguntaSelecionada, setPerguntaSelecionada] = useState(null);

  const [novaPergunta, setNovaPergunta] = useState("");
  const [novaResposta, setNovaResposta] = useState("");

  useEffect(() => {
    carregarPerguntas();
  }, []);

  async function carregarPerguntas() {
    try {
      const dados = await getPerguntas();
      setPerguntas(dados);
      setRespostas([]);
      setPerguntaSelecionada(null);
    } catch (error) {
      alert(error.message);
    }
  }

  async function mostrarRespostas(id) {
    try {
      const dados = await getRespostas(id);
      setRespostas(dados);
      setPerguntaSelecionada(id);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleCriarPergunta(e) {
    e.preventDefault();
    if (!novaPergunta.trim()) return alert("Digite uma pergunta");
    try {
      await criarPergunta(novaPergunta);
      setNovaPergunta("");
      carregarPerguntas();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleCriarResposta(e) {
    e.preventDefault();
    if (!novaResposta.trim()) return alert("Digite uma resposta");
    if (!perguntaSelecionada) return alert("Selecione uma pergunta para responder");
    try {
      await criarResposta(perguntaSelecionada, novaResposta);
      setNovaResposta("");
      mostrarRespostas(perguntaSelecionada);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>FAQ</h1>

      <form onSubmit={handleCriarPergunta} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Digite nova pergunta"
          value={novaPergunta}
          onChange={(e) => setNovaPergunta(e.target.value)}
          style={{ width: "70%", marginRight: 8 }}
        />
        <button type="submit">Criar Pergunta</button>
      </form>

      <h2>Perguntas</h2>
      <ul>
        {perguntas.map((p) => (
          <li key={p.id} style={{ marginBottom: 10 }}>
            <button onClick={() => mostrarRespostas(p.id)} style={{ marginRight: 8 }}>
              Ver respostas
            </button>
            {p.pergunta}
          </li>
        ))}
      </ul>

      {perguntaSelecionada && (
        <>
          <h3>Respostas para pergunta ID {perguntaSelecionada}</h3>
          <ul>
            {respostas.length > 0 ? (
              respostas.map((r) => (
                <li key={r.id}>{r.resposta || "(Resposta vazia)"}</li>
              ))
            ) : (
              <li>Sem respostas ainda</li>
            )}
          </ul>

          <form onSubmit={handleCriarResposta} style={{ marginTop: 20 }}>
            <input
              type="text"
              placeholder="Digite nova resposta"
              value={novaResposta}
              onChange={(e) => setNovaResposta(e.target.value)}
              style={{ width: "70%", marginRight: 8 }}
            />
            <button type="submit">Criar Resposta</button>
          </form>
        </>
      )}
    </div>
  );
}
