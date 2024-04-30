from flask import Flask
from flask_cors import CORS

from rotas.colaboradores import colaboradores_bp
from rotas.epi import Epis_bp
# from rotas.rota_api_colaboradores_EPIs_bp import colaboradores_EPIs_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(colaboradores_bp, url_prefix='/colaboradores')
app.register_blueprint(Epis_bp, url_prefix='/epi')
# app.register_blueprint(colaboradores_EPIs_bp, url_prefix='/epis')

if __name__ == "__main__":
    app.run(port=5000, host='192.168.0.107', debug=True)