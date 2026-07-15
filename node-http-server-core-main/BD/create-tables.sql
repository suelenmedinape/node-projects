-- DROP TABLE tb_cliente;
-- DROP TABLE tb_endereco;
-- DROP TABLE tb_funcionario;
-- DROP TABLE tb_usuario;
-- DROP TYPE role_usuario;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE role_usuario AS ENUM (
    'ROLE_CLIENTE',
    'ROLE_BIBLIOTECARIO',
    'ROLE_GERENTE'
);

CREATE TYPE status_livro AS ENUM (
    'DISPONIVEL',
    'EMPRESTADO',
    'RESERVADO',
    'MANUTENCAO',
    'PERDIDO'
);

CREATE TYPE categoria_livro AS ENUM (
    'FICCAO', 'NAO_FICCAO', 'ROMANCE', 'SUSPENSE', 'FANTASIA',
    'CIENCIA', 'HISTORIA', 'BIOGRAFIA', 'AUTOAJUDA', 'INFANTIL',
    'JUVENIL', 'TECNICO', 'DIDATICO'
);

CREATE TABLE tb_usuario (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senhaHash TEXT NOT NULL,
    role role_usuario NOT NULL
);

CREATE TABLE tb_endereco (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    rua TEXT NOT NULL,
    numero TEXT NOT NULL,
    cidade TEXT NOT NULL,
    bairro TEXT NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(8) NOT NULL
);

CREATE TABLE tb_cliente (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL,
    tb_endereco_id UUID UNIQUE,
    tb_usuario_id UUID UNIQUE NOT NULL,
    FOREIGN KEY (tb_usuario_id)
        REFERENCES tb_usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (tb_endereco_id)
        REFERENCES tb_endereco(id)
        ON DELETE SET NULL
);

CREATE TABLE tb_funcionario (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    matricula TEXT NOT NULL,
    tb_usuario_id UUID UNIQUE NOT NULL,
    FOREIGN KEY (tb_usuario_id)
        REFERENCES tb_usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE tb_livro (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    quantidadeTotal INT NOT NULL,
    quantidadeDisponivel INT NOT NULL,
    statusLivro status_livro NOT NULL DEFAULT 'DISPONIVEL',
    categoriaLivro categoria_livro NOT NULL
);

CREATE TABLE tb_emprestimo (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tb_livro_id UUID NOT NULL,
    tb_cliente_id UUID NOT NULL,
    tb_funcionario_id UUID NOT NULL,
    dataEmprestimo DATE NOT NULL,
    dataDevolucao DATE NOT NULL,
    devolvido BOOLEAN DEFAULT false,

    FOREIGN KEY (tb_livro_id)
        REFERENCES tb_livro(id),

    FOREIGN KEY (tb_cliente_id)
        REFERENCES tb_cliente(id),

    FOREIGN KEY (tb_funcionario_id)
        REFERENCES tb_funcionario(id)
);

