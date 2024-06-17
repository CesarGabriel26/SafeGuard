import decimal
from flask import Blueprint, jsonify, request
from conexao import criar_conexao, fechar_conexao

Epis_bp = Blueprint('/epi', __name__)

dados_necessarios = ["nome_epi", "validade", "descricao", "categoria", "foto"]

def CheckValueNotIn(keys = [], obj = {}):
    for i in keys:
        if i not in obj:
            return True
    return False

@Epis_bp.route('/listar', methods=['GET'])
def ListarEPIs():
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM EPIs")
    EPIs = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(EPIs)

@Epis_bp.route('/buscar/<string:nome>', methods=['GET'])
def buscarEPIsNome(nome):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM EPIs WHERE nome_epi like %s"

    cursor.execute(consulta, (f'%{nome}%', ))

    EPIs = cursor.fetchall()
    
    cursor.close()
    conexao.close()

    return jsonify(EPIs)

@Epis_bp.route('/buscar/<int:id>', methods=['GET'])
def buscarEPIsId(id):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM EPIs WHERE id = %s"

    cursor.execute(consulta, (id, ))

    Epi = cursor.fetchone()
    
    cursor.close()
    conexao.close()

    return jsonify(Epi)

@Epis_bp.route('/cadastrar', methods=['POST'])
def cadastrarEPIs():
    novoEpi = request.get_json()
    
    if CheckValueNotIn(dados_necessarios,novoEpi):
        return jsonify({'status': 'error', "message": 'dados imcompletos'}), 400
    
    conexao = criar_conexao()
    cursor = conexao.cursor()

    try:
        campos = []
        keys = []
        valores = []
        
        for dado in novoEpi:
            campos.append(dado)
            valores.append(f'%s')
            keys.append(novoEpi[dado])
            
        comando = f'INSERT INTO EPIs ({",".join(campos)}) VALUES ({",".join(valores)})'
        cursor.execute(comando, keys)
        
        conexao.commit()
        return jsonify({'status':'success', 'code': 201}), 201
        
    except Exception as e:
        conexao.rollback()
        return jsonify({'status': 'error', 'message': str(e)})
        
    finally:
        cursor.close()
        fechar_conexao(conexao)
    
@Epis_bp.route('/alterar/<int:id>', methods=['PUT'])
def alterarEPI(id):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    dados = request.get_json()
    try:
        campos_para_atualizar = []
        valores_para_atualizar = []
        
        
        for dado in dados_necessarios:
            campos_para_atualizar.append(f'{dado} = %s')
            valores_para_atualizar.append(dados[dado])

      
        if not campos_para_atualizar:
            return jsonify({'status': 'error', 'message': 'Nenhum campo fornecido para atuaização'}), 400
        
        comando = "UPDATE EPIs SET "+",".join(campos_para_atualizar) + "WHERE id = %s"
        valores = valores_para_atualizar + [id]
        cursor.execute(comando,valores)
        conexao.commit()

        return  jsonify({'status': 'success', 'message': 'epi atualizado com sucesso'}), 200
        
    except Exception as e:
        conexao.rollback()
        return jsonify({'status': 'error', 'message': str(e)}), 200

    finally:
        cursor.close()
        fechar_conexao(conexao)
    

@Epis_bp.route('/deletar/<int:id>', methods=['DELETE'])
def deletarEPI(id):
    conexao = criar_conexao()
    cursor =  conexao.cursor()

    cursor.execute("SELECT COUNT(*) FROM EPIs WHERE id = %s", (id,))
    epis = cursor.fetchone()[0]

    if epis == 0:
        return jsonify({'status': 'error', 'message': 'id não encontrado'}), 404
    
    try:
        comando = 'DELETE FROM EPIs WHERE id = %s'
        
        cursor.execute(comando, (id,))
        
        conexao.commit()
        
        status = {'status': 'success', 'message': 'Epi deletado com sucesso'}
        
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}
        
    finally:
        cursor.close()
        conexao.close()
    
    return jsonify(status)
