import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function useCrud(apiBase) {
  const [dados, setDados] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  const carregar = () => {
    fetch(`${apiBase}`)
      .then(res => res.json())
      .then(setDados);
  };

  useEffect(carregar, []);

  const salvar = () => {
    const metodo = editId ? 'PUT' : 'POST';
    const url = editId ? `${apiBase}/${editId}` : `${apiBase}`;

    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        setForm({});
        setEditId(null);
        carregar();
      });
  };

  const deletar = (id) => {
    fetch(`${apiBase}/${id}`, { method: 'DELETE' })
      .then(() => carregar());
  };

  return { dados, form, setForm, salvar, deletar, setEditId };
}

function Section({ titulo, campos, crud }) {
  return (
    <div className="p-6 bg-white space-y-4 rounded shadow">
      <h1 className="text-2xl font-bold text-blue-700">{titulo}</h1>
      <div className="flex gap-2">
        {campos.map((campo) => (
          <Input
            key={campo.nome}
            placeholder={campo.label}
            value={crud.form[campo.nome] || ''}
            onChange={(e) => crud.setForm({ ...crud.form, [campo.nome]: e.target.value })}
          />
        ))}
        <Button onClick={crud.salvar} className="bg-blue-600 text-white">
          {crud.editId ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crud.dados.map((item, idx) => (
          <Card key={idx} className="bg-blue-50 border border-blue-200">
            <CardContent className="p-4">
              {campos.map((c) => (
                <p key={c.nome} className="text-sm text-blue-800">
                  <strong>{c.label}:</strong> {item[c.nome]}
                </p>
              ))}
              <div className="flex gap-2 mt-2">
                <Button onClick={() => {
                  crud.setForm(item);
                  crud.setEditId(item.id);
                }} className="bg-blue-500 text-white">Editar</Button>
                <Button onClick={() => crud.deletar(item.id)} variant="destructive">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Sistema() {
  const eventos = useCrud('/api/eventos');
  const contribuintes = useCrud('/contribuintes');
  const users = useCrud('/api/users');

  return (
    <div className="space-y-10 p-10 bg-white min-h-screen">
      <Section
        titulo="Eventos"
        campos={[{ nome: 'nome', label: 'Nome' }, { nome: 'descricao', label: 'Descrição' }]}
        crud={eventos}
      />
      <Section
        titulo="Contribuintes"
        campos={[{ nome: 'nome', label: 'Nome' }, { nome: 'cpf', label: 'CPF' }]}
        crud={contribuintes}
      />
      <Section
        titulo="Usuários"
        campos={[{ nome: 'email', label: 'Email' }, { nome: 'senha', label: 'Senha' }]}
        crud={users}
      />
    </div>
  );
}
