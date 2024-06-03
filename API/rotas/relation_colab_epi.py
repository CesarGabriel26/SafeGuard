from flask import Blueprint, jsonify, request
from conexao import criar_conexao, fechar_conexao

relation_colab_epi_bp = Blueprint('colab_epi',__name__)

@relation_colab_epi_bp.route('/obterPorColab/<int:id_cliente>', methods=['GET'])
def obterEpiPorColaborador(id_cliente):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)
    
    consulta = """
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
            Ce.id_colaborador = %s;
    """
    
    cursor.execute(consulta, (id_cliente, ))
    dados = cursor.fetchall()
    
    cursor.close()
    fechar_conexao(conexao)
    
    return jsonify(dados)

@relation_colab_epi_bp.route('/incluir', methods=['POST'])
def incluirRelacao():
    # Obtendo os dados da nova venda a partir do corpo da requisição em formato JSON
    novaRelacao = request.get_json()
    # Abrindo uma conexão com o banco de dados
    
    conexao = criar_conexao()
    # Criando um cursor para executar consultas SQL
    cursor = conexao.cursor(dictionary=True)
    
    try:
        # Preparando e executando a instrução SQL para inserir uma nova venda
        comando = 'INSERT INTO colaborador_EPIs (id_colaborador, id_EPIs, id_colaborador_supervisor, data_EPI) VALUES(%s, %s, %s, current_date())'
        cursor.execute(comando, (
            novaRelacao['id_colaborador'], 
            novaRelacao['id_EPIs'], 
            novaRelacao['id_colaborador_supervisor']
        ))
        # Confirmando a transação no banco de dados
        conexao.commit()
        # Retornando um status de sucesso em formato JSON
        status = {'status': 'success', 'message': 'Relação criada com sucesso', 'code': 201}
    except Exception as e:
        #Em caso de erro, revertendo a transação e retornando um status de erro em formato JSON
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}
    finally:
        # Fechando o cursor e a conexão com o banco de dados
        cursor.close()
        fechar_conexao(conexao)
        # Retornando o status em formato JSON
        return jsonify(status)
