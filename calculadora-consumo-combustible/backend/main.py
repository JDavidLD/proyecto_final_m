import os
from oct2py import Oct2Py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Configuración de CORS
CORS(app, origins="http://localhost:8000")

# Inicializa Oct2Py fuera de las rutas
oc = Oct2Py()

# Agregar el path donde está calculo_consumo.m
oc.addpath(r"C:\Users\Juand\OneDrive\Escritorio\Modelamiento\proyecto_final\modelamiento\calculadora-consumo-combustible\backend")

@app.route('/')
def index():
    return 'Bienvenido a la calculadora de consumo de combustible'

@app.route('/calcular', methods=['POST'])
def calcular():
    # Recibir los datos del frontend
    data = request.get_json()
    velocidad = data['velocidad']
    peso = data['peso']
    terreno_map = {"Plano": 1, "Subida": 2, "Bajada": 3}
    terreno = terreno_map.get(data['terreno'], 1)

    # Llamar a la función de Octave, que ahora devuelve consumo y velocidad_optima
    consumo, velocidad_optima = oc.calculo_consumo(velocidad, peso, terreno, nout=2)

    # Asegurarse de que ambos valores sean enviados al frontend
    return jsonify({
        "consumo_estimado": round(float(consumo), 2),
        "velocidad_optima": round(float(velocidad_optima), 2)  # Agregar la velocidad óptima
    })

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
