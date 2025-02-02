function iniciarSimulacion() {
    const numSimulaciones = parseInt(document.getElementById('numSimulaciones').value);
    if (isNaN(numSimulaciones) || numSimulaciones <= 0) {
        alert("Por favor, ingrese un número válido de simulaciones.");
        return;
    }

    const tablaBody = document.querySelector("#tablaResultados tbody");
    tablaBody.innerHTML = ""; // Limpiar la tabla antes de empezar

    let totalSuma = 0;

    for (let i = 1; i <= numSimulaciones; i++) {
        const random1 = Math.random();
        const random2 = Math.random();
        const random3 = Math.random();

        const valor1 = random1 >= 0.5 ? 5 : 1;
        const valor2 = random2 >= 0.5 ? 5 : 1;
        const valor3 = random3 >= 0.5 ? 5 : 1;

        const ganancia = (valor1 === 5 && valor2 === 5 && valor3 === 5) ? 5 : 0;
        totalSuma += ganancia;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i}</td>
            <td>${random1.toFixed(8)}</td>
            <td>${valor1}</td>
            <td>${random2.toFixed(8)}</td>
            <td>${valor2}</td>
            <td>${random3.toFixed(8)}</td>
            <td>${valor3}</td>
            <td>${ganancia}</td>
        `;
        tablaBody.appendChild(row);
    }

    const gananciaEsperada = totalSuma / numSimulaciones;

    document.getElementById('totalSuma').textContent = totalSuma;
    document.getElementById('gananciaEsperada').textContent = gananciaEsperada.toFixed(2);
}