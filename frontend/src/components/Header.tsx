import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-zinc-950 text-yellow-400 p-5 shadow-xl border-b-4 border-yellow-500">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">
          CFC <span className="text-white">Instrutor Yan</span>
        </h1>
        <nav className="flex gap-8 font-bold uppercase text-xs tracking-widest">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/alunos" className="hover:text-white transition-colors">Alunos</Link>
          <Link to="/aulas" className="hover:text-white transition-colors">Agenda</Link>
        </nav>
      </div>
    </header>
  );
}