create database SafeGuardPro;

use SafeGuardPro;

create table EPIs(
	id int primary key auto_increment,
    nome_epi varchar(100) not null,
    validade int not null,
    descricao varchar(300) not null,
    categoria varchar(50) not null,
    foto varchar(1500) not null
);

create table colaboradores(
	id int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(50) not null,
    senha varchar(30) not null,
    setor varchar(30) not null,
    cpf varchar(13) not null,
    cargo varchar(50) not null,
    cep varchar(10) not null,
    endereco varchar(100) not null,
    nr varchar(20) not null,
    bairro varchar(50) not null,
    cidade varchar(50) not null,
    estado varchar(50) not null
);

create table notificacoes(
	id int primary key auto_increment,
    descricao varchar(500) not null,
	id_colaboradores int,
    id_epi int
);

create table colaborador_EPIs(
    id int primary key auto_increment,
	id_colaborador int NOT NULL,
    id_EPIs int NOT NULL,
    id_colaborador_supervisor int NOT NULL,
    data_EPI date not null,
    data_vencimento date not null
);

-- insert into EPIs (nome_epi, validade, descricao, categoria, foto) value ('óculos', 10-12-2020, 'óculos de proteção que não queima teus olhisnhos', 'Óculos de proteção para risco biológico', 'https://images.tcdn.com.br/img/img_prod/916304/oculos_de_protecao_individual_epi_6921_1_ceac46bb3f7763c1ae802b0a43eaac09.jpg');

-- insert into colaboradores (nome, email, senha, setor, cpf, cargo, cep, endereco, nr, bairro, cidade, estado) value ('Carlos', 'CarlosDaniel@gmail.com', 10122233, 'administração', 46832494668, 'diretor', 106220145, 'espiritu santo', 28, 'alvares cabral', 'andradina', 'sao paulo');

-- insert into notificacoes (descricao) value ('notificação');

-- insert into colaborador_EPIs (id_colaborador, id_EPIs, id_colaborador_supervisor, data_EPI, data_vencimento) value (1,1,2, '2026-10-28', '2020-8-03');

-- select * from EPIs;

-- select * from colaboradores;

-- select * from notificacoes;

-- select * from colaborador_EPIs;