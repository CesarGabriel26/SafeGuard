import decimal
from flask import Blueprint, jsonify, request
from conexao import criar_conexao, fechar_conexao

colaboradores_bp = Blueprint('colaboradores', __name__)
dados_necessarios = ["id_colaborador", "id_EPIs", "id_colaborador_supervisor", "data_EPI", "data_vencimento"]

@colaboradores_bp.route('/cadastro', methods=['POST'])
def cadastrarColaboradores():
    novoColaboradores = request.get_json()

    if 'id_colaborador' not in novoColaboradores and 'id_EPIs' not in novoColaboradores and 'id_colaborador_supervisor' not in novoColaboradores and 'data_EPI' not in novoColaboradores and 'data_vencimento' not in novoColaboradores:
        return jsonify({'status': 'error', 'message': 'Dados imcompletos'}), 400
    
    conexao = criar_conexao()
    cursor = conexao.cursor()

    try:
        comando = 'INSERT INTO Colaboradores (id_colaborador, id_EPIs, id_colaborador_supervisor, data_EPI, data_vencimento) VALUES (%s, %s, %s, %s, %s)'
        cursor.execute(comando, (novoColaboradores['id_colaborador'], novoColaboradores['id_EPIs'], novoColaboradores['id_colaborador_supervisor'], novoColaboradores['data_EPI'], novoColaboradores['data_vencimento']))
        conexao.commit()
        status = {'status':'success', 'code': 201}
        return jsonify(status)
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}
        return jsonify(status)
    finally:
        cursor.close()
        fechar_conexao(conexao)


@colaboradores_bp.route('/obterColaboradores', methods=['GET'])
def obterColaboradores():
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Colaboradores")
    Colaboradores = cursor.fetchall()

    for Colaborador in Colaboradores:
        for chave, valor in Colaborador.items():
            if isinstance(valor, decimal.Decimal):
                Colaborador[chave] = float(valor)

    cursor.close()
    conexao.close()

    return jsonify(Colaboradores)

@colaboradores_bp.route('/buscarColaboradores/<string:id_colaborador', methods=['GET'])
def buscarColaboradores(id_colaborador):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM Colaboradores WHERE id_colaborador like %s"

    cursor.execute(consulta, (f'%{id_colaborador}'))

    Colaboradores = cursor.fetchall()

    for Colaborador in Colaboradores:
        for chave, valor in Colaborador.items():
            if isinstance(valor, decimal.Decimal):
                Colaborador[chave] = float(valor)

    
    cursor.close()
    conexao.close()

    return jsonify(Colaboradores)

@colaboradores_bp.route('/alterarColaborador/<int:id>', methods=['PUT'])
def alterarColaborador(id):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    dados = request.get_json()
    try:
        campos_para_atualizar = []
        valores_para_atualizar = []

        if 'id_colaborador' in dados:
            campos_para_atualizar.append('id_colaborador = %s')
            valores_para_atualizar.append(dados['id_colaborador'])

        if 'id_EPIs' in dados:
            campos_para_atualizar.append('id_EPIs = %s')
            valores_para_atualizar.append(dados['id_EPIs'])

        if 'id_colaborador_supervisor' in dados:
            campos_para_atualizar.append('id_colaborador_supervisor = %s')
            valores_para_atualizar.append(dados['id_colaborador_supervisor'])

        if 'data_EPI' in dados:
            campos_para_atualizar.append('data_EPI = %s')
            valores_para_atualizar.append(dados['data_EPI'])

        if 'data_vencimento' in dados:
            campos_para_atualizar.append('data_vencimento = %s')
            valores_para_atualizar.append(dados['data_vencimento'])

        if not campos_para_atualizar:
            return jsonify({'status': 'error', 'message': 'Nenhum campo fornecido para atuaização'}), 400
        
        comando = "UPDATE Colaboradores SET "+",".join(campos_para_atualizar) + "WHERE id_Colaborador = %s"
        valores = valores_para_atualizar + [id]
        cursor.execute(comando,valores)
        conexao.commit()

        status = {'status': 'success', 'message': 'Colaborador atualizado com sucesso'}
        return jsonify(status)
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}

    finally:
        cursor.close()
        fechar_conexao(conexao)


@colaboradores_bp.route('/apagarColaborador/<int:id>', methods=['DELETE'])
def deletarColaborador(id):
    conexao = criar_conexao()
    cursor =  conexao.cursor()

    livro_existe = cursor.execute("SELECT COUNT(*) FROM Colaboradores WHERE id_produyo = %s", (id,))

    if livro_existe == 0:
        return jsonify({'status': 'error', 'message': 'Livro não encontrado'}), 404
    
    try:
        comando = 'DELETE FROM Colaboradores WHERE id_Colaborador = %s'
        cursor.execute(comando, (id,))
        conexao.commit()
        status = {'status': 'success', 'message': 'Livro deletado com sucesso'}
        return jsonify(status)
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}
    finally:
        cursor.close()
        conexao.close()
