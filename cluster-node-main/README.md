# Cluster Node

Este repositório contém um projeto desenvolvido em Node.js, focado na implementação de **clusters** para otimização de desempenho e escalabilidade de aplicações.

---

## 📄 Descrição

O objetivo deste projeto é demonstrar a criação e o gerenciamento de **clusters** em Node.js.  
Clusters permitem que um servidor Node.js utilize todos os núcleos da CPU, aumentando a performance de aplicações que exigem alto processamento ou que recebem muitas requisições simultâneas.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Cluster Module**
- **npm** para gerenciamento de dependências

---

## ⚙️ Funcionalidades

- Criação de múltiplos processos filhos (workers) para distribuir a carga de trabalho.
- Gerenciamento automático de workers: criação, monitoramento e reinício em caso de falha.
- Demonstração de como a aplicação se comporta com múltiplos processos.
- Registro de logs para acompanhar o desempenho dos workers.

---

## 🚀 Como Executar

1. Clone este repositório:

   ```bash
   git clone https://github.com/suelenmedinape/cluster-node.git
   cd cluster-node
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o projeto:

   ```bash
   npm start
   ```

4. Acesse a aplicação conforme configurado (ex.: `http://localhost:3000`).

> Certifique-se de ter o Node.js instalado em sua máquina.

---

## 📚 Exemplos de Uso

Após iniciar a aplicação, você pode testar o cluster enviando múltiplas requisições ao servidor para observar como os workers distribuem a carga:

```bash
curl http://localhost:3000
```

Use ferramentas como **Postman** ou **ab (Apache Benchmark)** para simular múltiplas requisições simultâneas.

---

## 📖 Documentação

Para detalhes mais técnicos sobre a implementação, consulte o arquivo [Projeto 01 - Clusters.pdf](Projeto%2001%20-%20Clusters.pdf).

---

## 📝 Licença

Este projeto está licenciado sob a **Licença MIT**.

---

## 👤 Autor

**Suelen Medina**  
[GitHub](https://github.com/suelenmedinape)
