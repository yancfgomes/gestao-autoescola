import { useEffect, useState } from "react";
import api from "../api";
import {
  FaClipboardList,
  FaTrash,
  FaEdit,
  FaIdCard,
  FaPhone,
} from "react-icons/fa";

interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
}

interface Aula {
  id: number;
  aluno: number;
  data_aula: string;
  hora_aula: string;
  descricao: string;
  realizada: boolean;
}

export function AulasPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);

  const [idEdicao, setIdEdicao] = useState<number | null>(null);
  const [idAluno, setIdAluno] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    // Carregamento seguro dos dados
    api
      .get("alunos/")
      .then((res) => setAlunos(res.data))
      .catch((err) => console.error("Erro Alunos:", err));
    api
      .get("aulas/")
      .then((res) => setAulas(res.data))
      .catch((err) => console.error("Erro Aulas:", err));
  }, []);

  const limparCampos = () => {
    setIdAluno("");
    setData("");
    setHora("");
    setDescricao("");
    setIdEdicao(null);
  };

  const handleSalvarAula = async (e: React.FormEvent) => {
    e.preventDefault();
    const dados = {
      aluno: idAluno,
      data_aula: data,
      hora_aula: hora,
      descricao,
      realizada: false,
    };

    try {
      if (idEdicao) {
        const res = await api.put(`aulas/${idEdicao}/`, dados);
        setAulas(aulas.map((a) => (a.id === idEdicao ? res.data : a)));
      } else {
        const res = await api.post("aulas/", dados);
        setAulas([...aulas, res.data]);
      }
      limparCampos();
      alert("Operação realizada com sucesso!");
    } catch {
      alert("Erro ao salvar aula no servidor.");
    }
  };

  const handleDeletar = async (id: number) => {
    if (!window.confirm("Excluir esta aula?")) return;
    try {
      await api.delete(`aulas/${id}/`);
      setAulas(aulas.filter((a) => a.id !== id));
    } catch {
      alert("Erro ao deletar.");
    }
  };

  const prepararEdicao = (aula: Aula) => {
    setIdEdicao(aula.id);
    setIdAluno(aula.aluno.toString());
    setData(aula.data_aula);
    setHora(aula.hora_aula);
    setDescricao(aula.descricao || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-black text-zinc-900 uppercase mb-8 border-l-8 border-yellow-400 pl-4">
        Agenda
      </h2>

      {/* Formulário Dinâmico */}
      <section
        className={`p-8 rounded-3xl shadow-xl mb-12 border-b-4 ${idEdicao ? "bg-zinc-800 border-blue-500" : "bg-zinc-950 border-yellow-500"}`}
      >
        <form
          onSubmit={handleSalvarAula}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          <div className="lg:col-span-1">
            <label className="text-zinc-400 text-[10px] font-black mb-1 block">
              ALUNO
            </label>
            <select
              value={idAluno}
              onChange={(e) => setIdAluno(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 outline-none"
              required
            >
              <option value="">Selecione...</option>
              {alunos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700"
            required
          />
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700"
            required
          />
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="O que treinar?"
            className="p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700"
          />
          <button
            type="submit"
            className={`p-3.5 rounded-xl font-black uppercase text-xs ${idEdicao ? "bg-blue-500 text-white" : "bg-yellow-400 text-zinc-950"}`}
          >
            {idEdicao ? "Atualizar" : "Agendar"}
          </button>
        </form>
      </section>

      {/* Cards de Aulas com Proteção contra Erros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aulas.map((aula) => {
          const alunoObj = alunos.find((a) => a.id === aula.aluno);
          return (
            <div
              key={aula.id}
              className="p-6 bg-white rounded-3xl shadow-sm border border-zinc-100 relative"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => prepararEdicao(aula)}
                  className="p-2 text-zinc-400 hover:text-blue-500"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDeletar(aula.id)}
                  className="p-2 text-zinc-400 hover:text-red-500"
                >
                  <FaTrash size={14} />
                </button>
              </div>
              <h3 className="font-black text-xl mb-1">
                {alunoObj?.nome || "Carregando..."}
              </h3>
              <div className="flex gap-4 text-[10px] font-bold text-zinc-400 uppercase mb-4">
                <span className="flex items-center gap-1">
                  <FaIdCard /> {alunoObj?.cpf || "---"}
                </span>
                <span className="flex items-center gap-1">
                  <FaPhone /> {alunoObj?.telefone || "---"}
                </span>
              </div>
              <div className="bg-zinc-50 p-3 rounded-xl text-sm italic text-zinc-600 mb-4 flex gap-2">
                <FaClipboardList className="mt-1 text-yellow-600" />{" "}
                {aula.descricao || "Sem observações."}
              </div>
              <div className="text-xs font-bold text-zinc-500">
                {/* Tratamento de Dados: Limpa e inverte a data, extrai a hora sem os segundos */}
                {aula.data_aula ? (
                  <>
                    {aula.data_aula.includes("T")
                      ? aula.data_aula
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")
                      : aula.data_aula.split("-").reverse().join("/")}
                    {" às "}
                    {aula.hora_aula ? aula.hora_aula.substring(0, 5) : "--:--"}
                  </>
                ) : (
                  "Data não informada"
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
