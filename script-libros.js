function iniciarSimulacion() {
    const numSimulaciones = parseInt(document.getElementById('numSimulaciones').value);
    if (isNaN(numSimulaciones) || numSimulaciones <= 0) {
        alert("Por favor, ingrese un número válido de simulaciones.");
        return;
    }

    const tablaBody = document.querySelector("#tablaResultados tbody");
    tablaBody.innerHTML = ""; // Limpiar la tabla antes de empezar

    for (let dia = 1; dia <= numSimulaciones; dia++) {
        const random = Math.random();
        const demanda = obtenerDemanda(random);
        const ingresos = calcularIngresos(demanda);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${dia}</td>
            <td>${random.toFixed(3)}</td>
            <td>${demanda}</td>
            <td>${ingresos[0]}</td>
            <td>${ingresos[1]}</td>
            <td>${ingresos[2]}</td>
            <td>${ingresos[3]}</td>
        `;
        tablaBody.appendChild(row);
    }
}

function obtenerDemanda(random) {
    if (random < 0.15) return 0;
    if (random < 0.40) return 1;
    if (random < 0.85) return 2;
    if (random < 0.95) return 3;
    return 4;
}

function calcularIngresos(demanda) {
    switch (demanda) {
        case 0: return [0, 0, 0, 0];
        case 1: return [3, 3, 3, 3];
        case 2: return [3, 6, 6, 6];
        case 3: return [3, 6, 9, 9];
        case 4: return [3, 6, 9, 12];
        default: return [0, 0, 0, 0];
    }
}