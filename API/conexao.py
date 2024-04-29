import mysql.connector

def criar_conexao():
    return _mysql_connector.connect(
        host="localhost",
        user="root",
        password="admin",
        database="SafeGuardPro"
    )

def fechar_conexao(conexao):
    if conexao:
        conexao.close()