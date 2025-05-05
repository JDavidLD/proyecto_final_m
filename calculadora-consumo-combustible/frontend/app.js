document.getElementById('calcular').addEventListener('click', function() {
    const velocidad = parseFloat(document.getElementById('velocidad').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const terreno = document.getElementById('terreno').value;
    const distancia = parseFloat(document.getElementById("distancia").value); // ← DESCOMENTADO

    const resultadoDiv = document.getElementById('resultado');

    const datos = {
        velocidad: velocidad,
        peso: peso,
        terreno: terreno,
        distancia: distancia // ← DESCOMENTADO
    };

    console.log("Datos a enviar:", datos);

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
        resultadoHTML += `<br><strong>Gasto estimado:</strong> ${data.gasto_estimado} COP`;
        resultadoDiv.innerHTML = resultadoHTML;
    })
    .catch(error => {
        console.error('Error:', error);
        resultadoDiv.innerHTML = "<span class='error'>Error al obtener los resultados. Verifique la consola.</span>";
    });
});
