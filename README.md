# 🚗 Sistema de Gestão CFC - Instrutor Yan (Projeto 02)

Este projeto é um MVP (Mínimo Produto Viável) desenvolvido para gerenciar o fluxo de alunos e agendamentos de uma autoescola. O foco principal foi a integração de um ecossistema **Fullstack** e o aprendizado sobre o ciclo de vida de desenvolvimento.

## 🛠️ Tecnologias Utilizadas
* **Frontend:** React + TypeScript + Tailwind CSS
* **Backend:** Django + Django REST Framework (DRF)
* **Banco de Dados:** SQLite (Desenvolvimento)
* **Comunicação:** Axios para consumo de API

## 📋 Funcionalidades
- [x] Cadastro completo de Alunos (Nome, CPF, Telefone, Categoria).
- [x] Agendamento de aulas práticas com descrição de atividades (Ex: Baliza/Rampa).
- [x] Filtro de busca dinâmica de alunos por nome ou CPF.
- [x] Gestão de Status: Alternar entre aulas pendentes e realizadas.
- [x] Interface padronizada (Preto e Amarelo) focada em alta visibilidade.

## 🧠 Lições Aprendidas (Análise de Gestão)
Este projeto serviu como um laboratório de **Gestão de Requisitos** e **Engenharia de Software**:

1. **Retrabalho vs. Planejamento:** Identificou-se que a codificação iniciada sem um levantamento detalhado de requisitos gerou retrabalho na integração de campos do banco de dados (Ex: descrição e CPF). Isso validou a necessidade da fase de planejamento do PMBOK em projetos futuros.
2. **Tratamento de Dados:** Implementação de lógica no Frontend para tratar "sujeira" de dados brutos (formatação de strings de data/hora ISO-8601 para padrão brasileiro).
3. **Componentização:** Divisão do sistema em rotas e componentes reutilizáveis (Header/Footer/Pages) para facilitar a manutenção.

## 🚀 Próximos Passos (Projeto 03)
Com base nas métricas de desenvolvimento deste projeto, o próximo passo será:
- Criação de Documento de Requisitos (BRD) antes do código.
- Modelagem de Dados (MER) documentada.
- Implementação de Dashboard de análise de desempenho (KPIs).

---
*Projeto desenvolvido para fins de portfólio e estudo de tecnologias Fullstack.*
