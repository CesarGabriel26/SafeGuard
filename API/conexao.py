import mysql.connector

def criar_conexao():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="SafeGuardPro"
        
        # user="senaiDev", 
        # password="D3vandradina", 
        # host="safeguardprocom.mysql.database.azure.com", 
        # port=3306, 
        # database="SafeGuardPro", 
        # ssl_ca="{ca-cert filename}", 
        # ssl_disabled=False
)

def fechar_conexao(conexao):
    if conexao:
        conexao.close()