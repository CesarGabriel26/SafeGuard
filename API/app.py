from flask import Flask
from rotas.rota_api_colaboradores import colaboradores_bp
from rotas.api_api_colaborador_EPIs import colaborador_EPIs_bp
from rotas.rota_api_EPIs import EPIs_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(colaboradores_bp, url_prefix='/colaboradores')
app.register_blueprint(colaborador_EPIs_bp, url_prefix='/colaborador_EPIs')
app.register_blueprint(EPIs_bp, url_prefix='/EPIs')

if __name__ == "__main__":
    app.run(port=5000, host='192.168.0.107', debug=True)