# 🚀 Meus Projetos em Node.js

Este repositório atua como um diretório central para dois projetos distintos desenvolvidos em Node.js. Ambos os projetos exploram conceitos importantes para o desenvolvimento backend, desde a otimização de performance com múltiplos processos até a modelagem e construção da camada de dados de uma API com TypeScript.

Abaixo, você encontrará os detalhes de cada um desses projetos.

---

## 1. 🌐 Cluster Node (`cluster-node-main`)

O projeto **Cluster Node** foca na implementação de **clusters** em Node.js para otimizar o desempenho e garantir a escalabilidade de aplicações, especialmente para aquelas que demandam alto processamento (como o uso da biblioteca `sharp` para manipulação de imagens, presente nas dependências).

### 🎯 Objetivo
Demonstrar na prática a criação e o gerenciamento de clusters. Como o Node.js é *single-threaded* por padrão, o uso do módulo nativo `cluster` permite que o servidor crie processos filhos (*workers*) para utilizar todos os núcleos da CPU disponíveis, balanceando a carga de requisições simultâneas.

### 🛠️ Tecnologias Utilizadas
- **Node.js**
- **Módulo Nativo `cluster`**
- **Sharp** (para processamento de imagens)
- **NPM** (Gerenciador de dependências)

### ⚙️ Funcionalidades
- Criação de múltiplos *workers* (processos filhos) para distribuir e paralelizar a carga de trabalho.
- Gerenciamento autônomo dos *workers*: criação inicial, monitoramento contínuo e reinicialização automática em caso de falhas de algum processo.
- Distribuição de requisições para testar cenários de alto volume.
- *Logs* integrados para acompanhar e auditar o desempenho de cada *worker* isoladamente.

### 🚀 Como executar
1. Acesse o diretório do projeto: 
   ```bash
   cd cluster-node-main
   ```
2. Instale as dependências: 
   ```bash
   npm install
   ```
3. Inicie o servidor mestre: 
   ```bash
   npm run dev
   ```
4. Para testar a carga, utilize ferramentas como o **Postman**, **cURL** ou **Apache Benchmark (ab)** enviando múltiplas requisições.

---

## 2. 📚 Sistema de Biblioteca - API Core (`node-http-server-core-main`)

O projeto **Sistema de Biblioteca** é uma API construída utilizando TypeScript. O nome sugere o foco na construção de um servidor web a partir de recursos nativos (core) do Node, com uma estrutura de pastas organizada (entities, enums, interfaces, validações) para o gerenciamento de uma biblioteca digital.

### 🎯 Objetivo
Estruturar o *backend* completo de um sistema de biblioteca, gerenciando desde os usuários (clientes, bibliotecários, gerentes) até o controle do acervo de livros e o ciclo de vida dos empréstimos.

### 🛠️ Tecnologias Utilizadas
- **Node.js**
- **TypeScript** (para tipagem estática e maior segurança no código)
- **ts-node** & **nodemon** (para ambiente de desenvolvimento ágil)
- **PostgreSQL** (Scripts de modelagem de dados)
- **Zod** (para validação de schemas/dados)
- **PNPM** (Gerenciador de pacotes)

### 🗄️ Modelagem de Dados e Funcionalidades
O projeto já conta com uma estrutura robusta de Banco de Dados Relacional (PostgreSQL), definida no arquivo `BD/create-tables.sql`, que inclui:
- **Tabelas de Acesso e Pessoas:**
  - `tb_usuario`: Controle de autenticação e perfis de acesso (`ROLE_CLIENTE`, `ROLE_BIBLIOTECARIO`, `ROLE_GERENTE`).
  - `tb_endereco`, `tb_cliente`, e `tb_funcionario`: Gestão detalhada dos dados físicos e de identificação de usuários.
- **Acervo e Movimentação:**
  - `tb_livro`: Registro de livros, controlando a quantidade total e disponível, divididos em categorias variadas (Ficção, Romance, Ciência, História, etc.) e o status atual (`DISPONIVEL`, `EMPRESTADO`, `RESERVADO`, etc.).
  - `tb_emprestimo`: Tabela transacional que correlaciona Livros, Clientes e Funcionários, mapeando as datas de empréstimo, devolução e controle de atrasos.

### 🚀 Como executar
1. Acesse o diretório principal do backend: 
   ```bash
   cd node-http-server-core-main/backend
   ```
2. Instale as dependências com PNPM (gerenciador oficial configurado no projeto): 
   ```bash
   pnpm install
   ```
3. Suba o ambiente de desenvolvimento: 
   ```bash
   pnpm run dev
   ```
4. *Nota:* Para o pleno funcionamento das funcionalidades de banco, é necessário provisionar uma instância do PostgreSQL e executar o script de criação de tabelas localizado na pasta `BD/create-tables.sql`.

---

## 👤 Autora
**Suelen Medina** - [GitHub](https://github.com/suelenmedinape)
