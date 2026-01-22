import { useEffect, useState } from "react";
import api from "../api";
import { FaUserPlus, FaSearch, FaUserGraduate, FaIdCard, FaPhone } from "react-icons/fa";

interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  categoria: string;
}

export function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [busca, setBusca] = useState("");
  
  // Estados para o formulário
  const [novoNome, setNovoNome] = useState("");
  const [novoCpf, setNovoCpf] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("B");

  useEffect(() => {
    api.get("alunos/").then((res) => setAlunos(res.data));
  }, []);

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("alunos/", { 
        nome: novoNome, 
        cpf: novoCpf, 
        telefone: novoTelefone, 
        categoria: novaCategoria 
      });
      setAlunos([...alunos, res.data]);
      setNovoNome(""); setNovoCpf(""); setNovoTelefone(""); setNovaCategoria("B");
      alert("Aluno cadastrado com sucesso!");
    } catch {
      alert("Erro ao cadastrar. Verifique os campos no Django.");
    }
  };

  // Lógica do Filtro de Busca
  const alunosFiltrados = alunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
    aluno.cpf.includes(busca)
  );

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter border-l-8 border-yellow-400 pl-4">
          Gestão de Alunos
        </h2>
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-3.5 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Buscar aluno..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:border-yellow-400 outline-none shadow-sm"
          />
        </div>
      </header>

      {/* Formulário de Cadastro (Estilo Dark Autoescola) */}
      <section className="bg-zinc-950 p-8 rounded-3xl shadow-2xl mb-12 border-b-4 border-yellow-500">
        <div className="flex items-center gap-3 mb-6 text-yellow-400">
          <FaUserPlus size={24} />
          <h3 className="text-xl font-bold uppercase italic">Novo Cadastro</h3>
        </div>
        
        <form onSubmit={handleCadastrar} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="lg:col-span-1">
            <label className="text-zinc-400 text-xs font-black uppercase mb-2 block">Nome Completo</label>
            <input type="text" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} className="w-full p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-400 outline-none transition-all" placeholder="Nome do Aluno" required />
          </div>
          <div>
            <label className="text-zinc-400 text-xs font-black uppercase mb-2 block">CPF</label>
            <input type="text" value={novoCpf} onChange={(e) => setNovoCpf(e.target.value)} className="w-full p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-400 outline-none transition-all" placeholder="000.000.000-00" />
          </div>
          <div>
            <label className="text-zinc-400 text-xs font-black uppercase mb-2 block">Categoria</label>
            <select value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} className="w-full p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 outline-none">
              <option value="A">A (Moto)</option>
              <option value="B">B (Carro)</option>
              <option value="AB">AB (Ambos)</option>
            </select>
          </div>
          <button type="submit" className="bg-yellow-400 text-zinc-950 font-black p-3.5 rounded-xl hover:bg-yellow-500 hover:scale-105 transition-all uppercase text-sm shadow-lg shadow-yellow-900/20">
            Cadastrar Aluno
          </button>
        </form>
      </section>

      {/* Listagem de Alunos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alunosFiltrados.map(aluno => (
          <div key={aluno.id} className="bg-white p-6 rounded-3xl shadow-md border border-zinc-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400/10 rounded-bl-full flex items-center justify-end pr-3 pt-3 group-hover:bg-yellow-400/20 transition-colors">
              <FaUserGraduate className="text-yellow-600" />
            </div>
            
            <h3 className="font-black text-xl text-zinc-900 mb-4">{aluno.nome}</h3>
            
            <div className="space-y-2 mb-6">
              <p className="flex items-center gap-2 text-zinc-500 text-sm">
                <FaIdCard className="text-yellow-500" /> {aluno.cpf || "CPF não informado"}
              </p>
              <p className="flex items-center gap-2 text-zinc-500 text-sm">
                <FaPhone className="text-yellow-500" /> {aluno.telefone || "Sem telefone"}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-zinc-50">
              <span className="px-4 py-1.5 bg-zinc-900 text-yellow-400 rounded-full text-[10px] font-black uppercase tracking-tighter italic">
                Categoria {aluno.categoria}
              </span>
              <button className="text-zinc-300 hover:text-red-500 transition-colors text-xs font-bold uppercase">
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {alunosFiltrados.length === 0 && (
        <div className="text-center py-20 text-zinc-400 font-bold uppercase tracking-widest">
          Nenhum aluno encontrado
        </div>
      )}
    </div>
  );
}