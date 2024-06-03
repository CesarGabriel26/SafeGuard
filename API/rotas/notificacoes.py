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

@notificacao_bp.route('/gerarNotificacao', methods=['POST'])
def gerarNotificacao():
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)
    
    cursor.execute(
        """
            select
                ce.id, e.nome_epi, ce.id_colaborador, ce.id_EPIs, date_format(ce.data_vencimento, '%d/%m/%y') as data_vencimento
            from
                colaborador_EPIs ce join EPIs e on ce.id_EPIs = e.id
            where
                ce.data_vencimento <= (current_date() + interval 100 day) and ce.notificado = 0;
        """
    )
    
    dados = cursor.fetchall()
    for item in dados:
        comando = "insert into notificacoes (id_colaboradores, id_epi, descricao) value (%s,%s,%s)"
        descricao = f'Seu EPI {item.nome_epi} vence no dia {item.data_vencimento} solicite um novo com seu supervisor'
        cursor.execute(comando, (item.id_colaborador, item.id_EPIs, descricao, ))
        
        comando = 'update colaborador_EPIs set notificado = 1 where id = %s'
        cursor.execute(comando, (item.id, ))
        
    conexao.commit()
    cursor.close()
    fechar_conexao(conexao)
    return jsonify(dados)

@notificacao_bp.route('/obter/<int:id>', methods=['GET'])
def obterNotificacao(id):
    conexao = criar_conexao()
    cursor = conexao.cursor(dictionary=True)
    
    cursor.execute("select * from notificacoes where id_colaboradores = %s", (id, ))
    dados = cursor.fetchall()
    
    cursor.close()
    fechar_conexao(conexao)
    return jsonify(dados)