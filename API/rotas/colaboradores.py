import decimal
from flask import Blueprint, jsonify, request
from conexao import criar_conexao, fechar_conexao

colaboradores_bp = Blueprint('/colaboradores', __name__)

dados_necessarios = [
    "id_colaborador", 
    "nome", "email", 
    "senha", "setor", 
    "cpf", "cargo",
    "cep", "endereco",
    "nr", "bairro", 
    "cidade", "estado"
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
def buscarColaboradoresId(id):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM colaboradores WHERE id = %s"
    cursor.execute(consulta, (id,))

    cliente = cursor.fetchone()
    
    cursor.close()
    conexao.close()
    
    return jsonify(cliente)

