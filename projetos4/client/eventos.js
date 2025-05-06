import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [novoEvento, setNovoEvento] = useState({ nome: '', descricao: '' });
  const [idEdicao, setIdEdicao] = useState(null);

  useEffect(() => {
    fetch('/api/eventos/listar')
      .then(res => res.json())
      .then(setEventos);
  }, []);

  const salvar = () => {
    const metodo = idEdicao ? 'PUT' : 'POST';
    const url = idEdicao ? `/api/eventos/atualizar/${idEdicao}` : '/api/eventos/cadastrar';

    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoEvento),
    })
      .then(res => res.json())
      .then(() => {
        setNovoEvento({ nome: '', descricao: '' });
        setIdEdicao(null);
        return fetch('/api/eventos/listar').then(res => res.json()).then(setEventos);
      });
  };

  const editar = (evento) => {
    setNovoEvento({ nome: evento.nome, descricao: evento.descricao });
    setIdEdicao(evento.id);
  };

  const deletar = (id) => {
    fetch(`/api/eventos/deletar/${id}`, { method: 'DELETE' })
      .then(() => fetch('/api/eventos/listar').then(res => res.json()).then(setEventos));
  };

  return (
    <div className="p-6 space-y-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700">Gerenciamento de Eventos</h1>

      <div className="space-x-2 flex">
        <Input
          placeholder="Nome do Evento"
          value={novoEvento.nome}
          onChange={(e) => setNovoEvento({ ...novoEvento, nome: e.target.value })}
        />
        <Input
          placeholder="Descrição"
          value={novoEvento.descricao}
          onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
        />
        <Button onClick={salvar} className="bg-blue-600 text-white">
          {idEdicao ? 'Atualizar' : 'Adicionar'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventos.map((evento) => (
          <Card key={evento.id} className="bg-blue-50 border border-blue-200">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-blue-800">{evento.nome}</h2>
              <p className="text-sm text-blue-700">{evento.descricao}</p>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => editar(evento)} className="bg-blue-500 text-white">Editar</Button>
                <Button onClick={() => deletar(evento.id)} variant="destructive">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
