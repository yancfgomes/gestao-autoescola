import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import {Footer} from "./components/Footer";
import { AulasPage } from "./pages/AulasPage";
import { AlunosPage } from "./pages/AlunosPage";
// Aqui você vai importar as outras páginas conforme for criando:
// import { AlunosPage } from "./pages/AlunosPage";
// import { AulasPage } from "./pages/AulasPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Adicionaremos os componentes de Alunos e Aulas aqui em seguida */}
            <Route path="/alunos" element={<AlunosPage />} />
            <Route path="/aulas" element={<AulasPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;