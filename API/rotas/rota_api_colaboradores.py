import decimal
from flask import Blueprint
from conexao import criar_conexao, fechar_conexao

colaboradores_bp = Blueprint('/colaboradores', __name__)
dados_necessarios = ["id_colaborador", "nome", "email", "senha", "setor", "cpf", "cargo", "cep", "endereco", "nr", "bairro", "cidade", "estado"]

def CheckValueNotIn(keys = [], obj = {}):
    for i in keys:
        if i not in obj:
            return True
    return False

@colaboradores_bp.route('/cadastrarColaborador', methods=['POST'])
def cadastrarColaborador():
    novoColaborador = request.get_json()
    
    if CheckValueNotIn(dados_necessarios,novoColaborador):
        return jsonify({'status': 'error', "message": 'dados imcompletos'}), 400
    
    conexao = criar_conexao()
    cursor = conexao.cursor()

    try:
        comando = 'INSERT INTO colaboradores (id_colaborador, nome, email, senha, setor, cpf, cargo, cep, endereco, nr, bairro, cidade, estado) VALUES (%s, %s, %s)'
        cursor.execute(comando, (novoColaboradores['nome'],
                                novoColaboradores['email'], 
                                novoColaboradores['senha'], 
                                novoColaboradores['setor'], 
                                novoColaboradores['cpf'], 
                                novoColaboradores['cargo'], 
                                novoColaboradores['cep'], 
                                novoColaboradores['endereco'], 
                                novoColaboradores['nr'], 
                                novoColaboradores['bairro'], 
                                novoColaboradores['cidade'], 
                                novoColaboradores['estado'],))
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

    cursor.execute("SELECT * FROM colaboradores")
    colaboradores = cursor.fetchall()

    for colaborador in colaboradores:
        for chave, valor in colaborador.items():
            if isinstance(valor, decimal.Decimal):
                colaboradores[chave] = float(valor)

    cursor.close()
    conexao.close()

    return jsonify(colaboradores)

@colaboradores_bp.route('/buscarColaboradores/<string:nome', methods=['GET'])
def buscarColaboradores(nome):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM colaboradores WHERE nome like %s"

    cursor.execute(consulta, (f'%{nome}'))

    colaboradores = cursor.fetchall()

    for colaborador in colaboradores:
        for chave, valor in colaborador.items():
            if isinstance(valor, decimal.Decimal):
                colaborador[chave] = float(valor)

    
    cursor.close()
    conexao.close()

    return jsonify(colaboradores)

@colaboradores_bp.route('/alterarColaborador/<int:id>', methods=['PUT'])
def alterarColaborador(id):
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
        
        comando = "UPDATE colaboradores SET "+",".join(campos_para_atualizar) + "WHERE id_colaborador = %s"
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

    colaborador_existe = cursor.execute("SELECT COUNT(*) FROM colaboradores WHERE id_colaborador = %s", (id,))

    if colaborador_existe == 0:
        return jsonify({'status': 'error', 'message': 'Colaborador não encontrado'}), 404
    
    try:
        comando = 'DELETE FROM colaboradores WHERE id_colaborador = %s'
        cursor.execute(comando, (id,))
        conexao.commit()
        status = {'status': 'success', 'message': 'Colaborador deletado com sucesso'}
        return jsonify(status)
    except Exception as e:
        conexao.rollback()
        status = {'status': 'error', 'message': str(e)}
    finally:
        cursor.close()
        conexao.close()
