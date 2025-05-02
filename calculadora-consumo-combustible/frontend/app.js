console.log('Archivo app.js cargado');

document.getElementById('calcular').addEventListener('click', function() {
    const velocidad = parseFloat(document.getElementById('velocidad').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const terreno = document.getElementById('terreno').value;

    const resultadoDiv = document.getElementById('resultado'); // Referencia al div

    // Validaciones
    if (isNaN(velocidad) || isNaN(peso)) {
        resultadoDiv.innerHTML = "<span style='color:red;'>Por favor, ingrese valores válidos.</span>";
        return;
    }

    if (velocidad < 30 || velocidad > 180) {
        resultadoDiv.innerHTML = "<span style='color:red;'>La velocidad debe estar entre 30 y 180 km/h.</span>";
        return;
    }

    const datos = {
        velocidad: velocidad,
        peso: peso,
        terreno: terreno
    };

    fetch('http://localhost:5000/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        let resultadoHTML = `<strong>Consumo estimado:</strong> ${data.consumo_estimado} litros/100 km`;

        if (data.velocidad_optima !== undefined) {
            resultadoHTML += `<br><strong>Velocidad óptima:</strong> ${data.velocidad_optima} km/h`;
        }

        resultadoDiv.innerHTML = resultadoHTML;
    })
    .catch(error => {
        console.error('Error:', error);
        resultadoDiv.innerHTML = "<span style='color:red;'>Error al obtener los resultados. Verifique la consola.</span>";
    });
});
