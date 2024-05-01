import decimal
from flask import Blueprint, jsonify, request
from conexao import criar_conexao, fechar_conexao

relation_colab_epi_bp = Blueprint('colab_epi', __name__)
dados_necessarios = ["id_colaborador", "id_EPIs", "id_colaborador_supervisor", "data_EPI", "data_vencimento"]

def CheckValueNotIn(keys = [], obj = {}):
    for i in keys:
        if i not in obj:
            return True
    return False


@relation_colab_epi_bp.route('/listar', methods=['GET'])
def listarRelacoes():
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM colaborador_EPIs")
    Colaboradores = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(Colaboradores)

@relation_colab_epi_bp.route('/buscarPcolaborador/<int:id_colaborador>', methods=['GET'])
def buscarRelacaoPorColaborador(id_colaborador):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM colaborador_EPIs WHERE id_colaborador = %s"

    cursor.execute(consulta, (id_colaborador, ))

    relacao = cursor.fetchall()
    
    cursor.close()
    conexao.close()

    return jsonify(relacao)

@relation_colab_epi_bp.route('/buscarPepi/<int:id_epi>', methods=['GET'])
def buscarRelacaoPorEpi(id_epi):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM colaborador_EPIs WHERE id_EPIs = %s"

    cursor.execute(consulta, (id_epi, ))

    relacao = cursor.fetchall()
    
    cursor.close()
    conexao.close()

    return jsonify(relacao)

@relation_colab_epi_bp.route('/add', methods=['POST'])
def novaRelacao():
    nova_relacao = request.get_json()

    if CheckValueNotIn(dados_necessarios,nova_relacao):
        return jsonify({'status': 'error', "message": 'dados imcompletos'}), 400
    
    conexao = criar_conexao()
    cursor = conexao.cursor()

    try:
        campos = []
        keys = []
        valores = []
        
        
        for dado in nova_relacao:
            campos.append(dado)
            valores.append(f'%s')
            keys.append(nova_relacao[dado])
        
        comando = f'INSERT INTO colaborador_EPIs ({",".join(campos)}) VALUES ({",".join(valores)})'
        cursor.execute(comando, keys)
        conexao.commit()
        status = {'status':'success', 'code': 201}
        
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}
        
    finally:
        cursor.close()
        fechar_conexao(conexao)
    
    return jsonify(status)

@relation_colab_epi_bp.route('/alterar/<int:id>', methods=['PUT'])
def alterarRelacao(id):
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
        
        comando = "UPDATE colaborador_EPIs SET "+",".join(campos_para_atualizar) + "WHERE id = %s"
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

@relation_colab_epi_bp.route('/deletar/<int:id>', methods=['DELETE'])
def deletarRelacao(id):
    conexao = criar_conexao()
    cursor =  conexao.cursor()

    relacao_existente = cursor.execute("SELECT COUNT(*) FROM colaborador_EPIs WHERE id = %s", (id,))

    if relacao_existente == 0:
        return jsonify({'status': 'error', 'message': 'Livro não encontrado'}), 404
    
    try:
        comando = 'DELETE FROM colaborador_EPIs WHERE id_Colaborador = %s'
        cursor.execute(comando, (id,))
        conexao.commit()
        status = {'status': 'success', 'message': 'Livro deletado com sucesso'}
    
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}
    
    finally:
        cursor.close()
        conexao.close()
        
    return jsonify(status)
