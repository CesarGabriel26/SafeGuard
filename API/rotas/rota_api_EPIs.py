import decimal
from flask import Blueprint
from conexao import criar_conexao, fechar_conexao

colaboradores_EPIs_bp = Blueprint('/colaboradores_EPIs', __name__)
dados_necessarios = ["id_colaborador", "nome", "email", "senha", "setor", "cpf", "cargo", "cep", "endereco", "nr", "bairro", "cidade", "estado"]

def CheckValueNotIn(keys = [], obj = {}):
    for i in keys:
        if i not in obj:
            return True
    return False

@colaboradores_EPIs_bp.route('/cadastrarColaborador', methods=['POST'])
def cadastrarColaborador():
    novoColaborador = request.get_json()
    
    if CheckValueNotIn(dados_necessarios,novoColaborador):
        return jsonify({'status': 'error', "message": 'dados imcompletos'}), 400
    
    conexao = criar_conexao()
    cursor = conexao.cursor()

    try:
        comando = 'INSERT INTO colaboradores_EPIs (id_epi, nome_epi, validade, descricao, categoria, foto) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
        cursor.execute(comando, (novoColaboradores_EPIs['nome'],
                                novoColaboradores_EPIs['email'], 
                                novoColaboradores_EPIs['senha'], 
                                novoColaboradores_EPIs['setor'], 
                                novoColaboradores_EPIs['cpf'], 
                                novoColaboradores_EPIs['cargo'], 
                                novoColaboradores_EPIs['cep'], 
                                novoColaboradores_EPIs['endereco'], 
                                novoColaboradores_EPIs['nr'], 
                                novoColaboradores_EPIs['bairro'], 
                                novoColaboradores_EPIs['cidade'], 
                                novoColaboradores_EPIs['estado'],))
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


@colaboradores_EPIs_bp.route('/obterColaboradores_EPIs', methods=['GET'])
def obterColaboradores_EPIs():
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM colaboradores_EPIs")
    colaboradores_EPIs = cursor.fetchall()

    for colaborador in colaboradores_EPIs:
        for chave, valor in colaborador.items():
            if isinstance(valor, decimal.Decimal):
                colaboradores_EPIs[chave] = float(valor)

    cursor.close()
    conexao.close()

    return jsonify(colaboradores_EPIs)

@colaboradores_EPIs_bp.route('/buscarColaboradores_EPIs/<string:nome', methods=['GET'])
def buscarColaboradores_EPIs(nome):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta = "SELECT * FROM colaboradores_EPIs WHERE nome like %s"

    cursor.execute(consulta, (f'%{nome}'))

    colaboradores_EPIs = cursor.fetchall()

    for colaborador in colaboradores_EPIs:
        for chave, valor in colaborador.items():
            if isinstance(valor, decimal.Decimal):
                colaborador[chave] = float(valor)

    
    cursor.close()
    conexao.close()

    return jsonify(colaboradores_EPIs)

@colaboradores_EPIs_bp.route('/alterarColaborador/<int:id>', methods=['PUT'])
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
        
        comando = "UPDATE colaboradores_EPIs SET "+",".join(campos_para_atualizar) + "WHERE id_colaborador = %s"
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


@colaboradores_EPIs_bp.route('/apagarColaborador/<int:id>', methods=['DELETE'])
def deletarColaborador(id):
    conexao = criar_conexao()
    cursor =  conexao.cursor()

    colaborador_existe = cursor.execute("SELECT COUNT(*) FROM colaboradores_EPIs WHERE id_colaborador = %s", (id,))

    if colaborador_existe == 0:
        return jsonify({'status': 'error', 'message': 'Colaborador não encontrado'}), 404
    
    try:
        comando = 'DELETE FROM colaboradores_EPIs WHERE id_colaborador = %s'
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
