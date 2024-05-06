import decimal
from flask import Blueprint, jsonify, request
from conexao import criar_conexao, fechar_conexao

notificacao_bp = Blueprint('notificacao', __name__)
dados_necessarios = ["descricao", "id_colaboradores", "id_epi"]

def CheckValueNotIn(keys = [], obj = {}):
    for i in keys:
        if i not in obj:
            return True
    return False

#@ notificacoes -> descricao, id_colaboradores, id_epi

@notificacao_bp.route('/listar', methods=['GET'])
def listarNotificacoes():
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM notificacoes")
    Colaboradores = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(Colaboradores)

@notificacao_bp.route('/buscarPcolaborador/<int:id_colaborador>', methods=['GET'])
def buscarNotificacaoPorColaborador(id_colaborador):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM notificacoes WHERE id_colaboradores = %s"

    cursor.execute(consulta, (id_colaborador, ))

    Notificacao = cursor.fetchall()
    
    cursor.close()
    conexao.close()

    return jsonify(Notificacao)

@notificacao_bp.route('/buscarPepi/<int:id_epi>', methods=['GET'])
def buscarNotificacaoPorEpi(id_epi):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM notificacoes WHERE id_epi = %s"

    cursor.execute(consulta, (id_epi, ))

    Notificacao = cursor.fetchall()
    
    cursor.close()
    conexao.close()

    return jsonify(Notificacao)

@notificacao_bp.route('/add', methods=['POST'])
def novaNotificacao():
    nova_Notificacao = request.get_json()

    if CheckValueNotIn(dados_necessarios,nova_Notificacao):
        return jsonify({'status': 'error', "message": 'dados imcompletos'}), 400
    
    conexao = criar_conexao()
    cursor = conexao.cursor()

    try:
        campos = []
        keys = []
        valores = []
        
        
        for dado in nova_Notificacao:
            campos.append(dado)
            valores.append(f'%s')
            keys.append(nova_Notificacao[dado])
        
        comando = f'INSERT INTO notificacoes ({",".join(campos)}) VALUES ({",".join(valores)})'
        
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

@notificacao_bp.route('/alterar/<int:id>', methods=['PUT'])
def alterarNotificacao(id):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    dados = request.get_json()
    try:
        campos_para_atualizar = []
        valores_para_atualizar = []
        
        for dado in dados:
            campos_para_atualizar.append(f'{dado} = %s')
            valores_para_atualizar.append(dados[dado])

        if not campos_para_atualizar:
            return jsonify({'status': 'error', 'message': 'Nenhum campo fornecido para atualização'}), 400
        
        # Construct the SQL UPDATE statement
        comando = "UPDATE notificacoes SET " + ", ".join(campos_para_atualizar) + " WHERE id = %s"
        valores = valores_para_atualizar + [id]

        print("SQL Query:", comando, valores)  # Print SQL query for debugging
        
        cursor.execute(comando, valores)
        conexao.commit()

        status = {'status': 'success', 'message': 'Colaborador atualizado com sucesso'}
        
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}

    finally:
        cursor.close()
        fechar_conexao(conexao)
    
    return jsonify(status)

@notificacao_bp.route('/deletar/<int:id>', methods=['DELETE'])
def deletarNotificacao(id):
    conexao = criar_conexao()
    cursor =  conexao.cursor()

    Notificacao_existente = cursor.execute("SELECT COUNT(*) FROM notificacoes WHERE id = %s", (id,))

    if Notificacao_existente == 0:
        return jsonify({'status': 'error', 'message': 'Livro não encontrado'}), 404
    
    try:
        comando = 'DELETE FROM notificacoes WHERE id = %s'
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
