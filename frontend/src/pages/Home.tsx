import { Link } from "react-router-dom";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";

export function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-20 px-6">
      <header className="mb-12">
        <h2 className="text-5xl font-extrabold text-zinc-900 mb-4 tracking-tighter">
          Gestão de Autoescola
        </h2>
        <p className="text-zinc-500 text-xl font-medium">
          Bem-vindo ao seu painel de controle, Yan!
        </p>
      </header>

      {/* Grid de Botões Clicáveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Botão Ver Alunos */}
        <Link 
          to="/alunos" 
          className="bg-yellow-400 p-10 rounded-3xl shadow-lg border-2 border-zinc-900 flex flex-col items-center gap-4 hover:scale-105 hover:bg-yellow-500 transition-all group"
        >
          <FaUsers className="text-zinc-900 text-5xl group-hover:animate-pulse" />
          <span className="text-zinc-950 font-black text-2xl uppercase italic">
            Gerenciar Alunos
          </span>
        </Link>

        {/* Botão Agenda */}
        <Link 
          to="/aulas" 
          className="bg-zinc-900 p-10 rounded-3xl shadow-lg border-2 border-yellow-400 flex flex-col items-center gap-4 hover:scale-105 hover:bg-zinc-800 transition-all group"
        >
          <FaCalendarAlt className="text-yellow-400 text-5xl group-hover:animate-pulse" />
          <span className="text-yellow-400 font-black text-2xl uppercase italic">
            Ver Agenda
          </span>
        </Link>

      </div>

      {/* Atalho rápido para ações do dia (opcional) */}
      <div className="mt-16 p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm inline-block">
        <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">
          Status do Sistema: <span className="text-green-500">Online e Integrado ao Django</span>
        </p>
      </div>
    </div>
  );
}