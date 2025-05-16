const API_URL = "http://localhost:8080/faqs";

export async function getPerguntas() {
  const res = await fetch(`${API_URL}/perguntas`);
  if (!res.ok) throw new Error("Erro ao buscar perguntas");
  return await res.json();
}

export async function getRespostas(perguntaId) {
  const res = await fetch(`${API_URL}/respostas/${perguntaId}`);
  if (!res.ok) throw new Error("Erro ao buscar respostas");
  return await res.json();
}

export async function criarPergunta(perguntaTexto) {
  const res = await fetch(`${API_URL}/pergunta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta: perguntaTexto }),
  });
  if (!res.ok) throw new Error("Erro ao criar pergunta");
  return await res.json();
}

export async function criarResposta(perguntaId, respostaTexto) {
  // Aqui você deve enviar o objeto Faq com a perguntaPai (perguntaId) para associar resposta
  const res = await fetch(`${API_URL}/resposta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resposta: respostaTexto,
      perguntaPai: { id: perguntaId }
    }),
  });
  if (!res.ok) throw new Error("Erro ao criar resposta");
  return await res.json();
}
