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
    estado varchar(50) not null,
    foto varchar(1500) not null
);

create table notificacoes(
	id int primary key auto_increment,
    descricao varchar(500) not null,
	id_colaboradores int,
    id_epi int,
    tipo varchar(255)
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

CREATE TRIGGER `colaboradores_epis_BEFORE_INSERT` BEFORE INSERT ON colaborador_EPIs FOR EACH ROW BEGIN
declare dias_vencimento int;
select validade into dias_vencimento from EPIs where id = new.id_EPIs;
set new.data_vencimento = current_date() + interval dias_vencimento day
end;

insert into EPIs (nome_epi, validade, descricao, categoria, foto) value ('adadasdadasdadasdsaddsdasd', 365, 'óculos de proteção que não queima teus olhisnhos', 'Óculos de proteção para risco biológico', 'https://images.tcdn.com.br/img/img_prod/916304/oculos_de_protecao_individual_epi_6921_1_ceac46bb3f7763c1ae802b0a43eaac09.jpg');

insert into colaboradores (nome, email, senha, setor, cpf, cargo, cep, endereco, nr, bairro, cidade, estado, foto) value ('Carlos', 'CarlosDaniel@safenet.com', 1234, 'administração', 46832494668, 'Colaborador', 106220145, 'espiritu santo', 28, 'alvares cabral', 'Andradina', 'SP', 'https://i.imgflip.com/7jv8bd.png?a476688');
insert into colaboradores (nome, email, senha, setor, cpf, cargo, cep, endereco, nr, bairro, cidade, estado, foto) value ("Pimentinha", "pimentinha@safenet.com", 1234, "produção", 78952465877, "Administrador", 16900408, "Rua Alagoas", 2587, "Benfica", "Andradina", "SP", 'https://images7.memedroid.com/images/UPLOADED680/5f4c53ee35359.jpeg');

-- Visualizar

select
	Ce.id, 
	E.nome_epi as Epi, 
	c.nome as Colaborador, 
	Cs.nome as Administrador, 
	Ce.data_EPI as data_EPI,
    Ce.data_vencimento as data_vencimento
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

DELETE FROM colaborador_EPIs WHERE id = 2;
