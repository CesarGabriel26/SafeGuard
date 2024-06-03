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
    data_vencimento date not null,
    notificado int
);

-- Inserções

insert into EPIs (nome_epi, validade, descricao, categoria, foto) value ('óculos', 365, 'óculos de proteção que não queima teus olhisnhos', 'Óculos de proteção para risco biológico', 'https://images.tcdn.com.br/img/img_prod/916304/oculos_de_protecao_individual_epi_6921_1_ceac46bb3f7763c1ae802b0a43eaac09.jpg');

insert into colaboradores (nome, email, senha, setor, cpf, cargo, cep, endereco, nr, bairro, cidade, estado) value ('Carlos', 'CarlosDaniel@gmail.com', 10122233, 'administração', 46832494668, 'diretor', 106220145, 'espiritu santo', 28, 'alvares cabral', 'andradina', 'sao paulo');

insert into notificacoes (descricao, id_colaboradores, id_epi) value ('Novo EPI veinculado a voce', 2, 1);
	
insert into colaborador_EPIs (id_colaborador, id_EPIs, id_colaborador_supervisor, data_EPI, data_vencimento) value (1,3,2, '2010-10-28', '2021-08-03');

-- Visualizar

select
	Ce.id, 
	E.nome_epi as Epi, 
	c.nome as Colaborador, 
	Cs.nome as Administrador, 
	date_format(Ce.data_EPI, '%d/%m/%y') as data_EPI,
    date_format(Ce.data_vencimento, '%d/%m/%y') as data_vencimento
from 
	colaborador_EPIs Ce
join 
	EPIs E on Ce.id_EPIs = E.id
join 
	colaboradores c on Ce.id_colaborador = c.id
join 
	colaboradores Cs on Ce.id_colaborador_supervisor = Cs.id
where
	Ce.id_colaborador = 1;

select
	ce.id, e.nome_epi, ce.id_colaborador, ce.id_EPIs, date_format(ce.data_vencimento, '%d/%m/%y') as data_vencimento
from
	colaborador_EPIs ce join EPIs e on ce.id_EPIs = e.id
where
	ce.data_vencimento <= (current_date() + interval 100 day) and ce.notificado = 0;

select * from EPIs;

select * from colaboradores;

select * from notificacoes;

select * from colaborador_EPIs;