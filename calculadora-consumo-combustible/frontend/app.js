document.getElementById('calcular').addEventListener('click', function() {
    const velocidad = parseFloat(document.getElementById('velocidad').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const terreno = document.getElementById('terreno').value;

    const resultadoDiv = document.getElementById('resultado'); // Referencia al div

    // Validaciones
    if (isNaN(velocidad) || isNaN(peso)) {
        resultadoDiv.innerHTML = "<span class='error'>Por favor, ingrese valores válidos para la velocidad y el peso.</span>";
        return;
    }

    if (velocidad < 30 || velocidad > 180) {
        resultadoDiv.innerHTML = "<span class='error'>La velocidad debe estar entre 30 y 180 km/h.</span>";
        return;
    }

    if (peso < 900) {
        resultadoDiv.innerHTML = "<span class='error'>Por favor, ingrese un peso de al menos 900 kg.</span>";
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
        resultadoDiv.innerHTML = "<span class='error'>Error al obtener los resultados. Verifique la consola.</span>";
    });
});
