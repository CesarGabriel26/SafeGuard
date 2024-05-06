import decimal
from flask import Blueprint, jsonify, request
from conexao import criar_conexao, fechar_conexao

colaboradores_bp = Blueprint('/colaboradores', __name__)

dados_necessarios = [
    "bairro",
    "cargo",
    "cep",
    "cidade",
    "cpf",
    "email",
    "endereco",
    "estado",
    "nome",
    "nr",
    "senha",
    "setor",
]

def CheckValueNotIn(keys = [], obj = {}):
    for i in keys:
        if i not in obj:
            return True
    return False

@colaboradores_bp.route('/listar', methods=['GET'])
def listar():
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM colaboradores")
    colaboradores = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(colaboradores)

@colaboradores_bp.route('/obter/<string:nome>', methods=['GET'])
def buscarColaboradoresNome(nome):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM colaboradores WHERE nome like %s"

    cursor.execute(consulta, (f'%{nome}%',))

    colaboradores = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(colaboradores)

@colaboradores_bp.route('/obter/<int:id>', methods=['GET'])
def buscarColaboradorId(id):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM colaboradores WHERE id = %s"
    cursor.execute(consulta, (id,))

    cliente = cursor.fetchone()
    
    cursor.close()
    conexao.close()
    
    return jsonify(cliente)

@colaboradores_bp.route('/cadastrar', methods=['POST'])
def cadastrarColaborador():
    novoColaborador = request.get_json()
    
    if CheckValueNotIn(dados_necessarios,novoColaborador):
        return jsonify({'status': 'error', "message": 'dados imcompletos'}), 400
    
    conexao = criar_conexao()
    cursor = conexao.cursor()

    try:
        campos = []
        keys = []
        valores = []
        
        
        for dado in novoColaborador:
            campos.append(dado)
            valores.append(f'%s')
            keys.append(novoColaborador[dado])

      
        if not campos:
            return jsonify({'status': 'error', 'message': 'Nenhum campo fornecido para atuaização'}), 400
        
        comando = f'INSERT INTO colaboradores ({",".join(campos)}) VALUES ({",".join(valores)})'
        cursor.execute(comando, keys)
        
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

@colaboradores_bp.route('/alterar/<int:id>', methods=['PUT'])
def alterarColaborador(id):
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
            return jsonify({'status': 'error', 'message': 'Nenhum campo fornecido para atuaização'}), 400
        
        comando = "UPDATE colaboradores SET " + ",".join(campos_para_atualizar) + "WHERE id = %s"
        
        valores = valores_para_atualizar + [id]
        cursor.execute(comando,valores)
        conexao.commit()

        status = {'status': 'success', 'message': 'Colaborador atualizado com sucesso'}
        
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)} 

    finally:
        cursor.close()
        fechar_conexao(conexao)
    
    return jsonify(status)

@colaboradores_bp.route('/deletar/<int:id>', methods=['DELETE'])
def deletarColaborador(id):
    conexao = criar_conexao()
    cursor = conexao.cursor()

    try:
        # Verifica se o colaborador existe
        cursor.execute("SELECT COUNT(*) FROM colaboradores WHERE id = %s", (id,))
        colaborador_existe = cursor.fetchone()[0]  # Lê o resultado da consulta

        if colaborador_existe == 0:
            return jsonify({'status': 'error', 'message': 'Colaborador não encontrado'}), 404

        # Deleta o colaborador
        comando = 'DELETE FROM colaboradores WHERE id = %s'
        cursor.execute(comando, (id,))
        conexao.commit()

        status = {'status': 'success', 'message': 'Colaborador deletado com sucesso'}

    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}
    finally:
        cursor.close()
        conexao.close()

    return jsonify(status)

@colaboradores_bp.route('/login', methods=['POST'])
def login(): 
    conexao = None
    cursor = None

    try:
        conexao = criar_conexao()
        cursor = conexao.cursor(dictionary=True)

        dados_login = request.get_json()
        
        if CheckValueNotIn(["email", "senha"], dados_login):
            return jsonify({'status': 'error', 'message': 'Dados incompletos'}), 400
            
        consulta = "SELECT * FROM colaboradores WHERE email = %s AND senha = %s"

        cursor.execute(consulta, (dados_login['email'], dados_login['senha']))

        colaborador = cursor.fetchone()

        if colaborador:
            return jsonify(colaborador)
        else:
            # Se o colaborador não for encontrado, retorne um erro com uma mensagem apropriada
            return jsonify({'status': 'error', 'message': 'Credenciais inválidas'}), 404

    except Exception as e:
        # Se ocorrer um erro durante o processamento da requisição, retorne um erro com a mensagem do erro
        conexao.rollback()
        return jsonify({'status': 'error', 'message': 'Erro interno do servidor: ' + str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conexao:
            fechar_conexao(conexao)