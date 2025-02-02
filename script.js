function startSimulation() {
    const maxTime = parseFloat(document.getElementById('maxTime').value);
    if (isNaN(maxTime) || maxTime <= 0) {
        alert("Por favor, ingrese un tiempo máximo válido.");
        return;
    }

    const lambda = 0.5; // Tasa de llegada de clientes
    let currentTime = 0;
    let eventCount = 0;
    let clientCount = 0;
    let nextClientTime = getNextClientTime(lambda, currentTime);
    let nextBusTime = getNextBusTime(currentTime);

    const tableBody = document.querySelector("#simulationTable tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla antes de empezar

    while (currentTime <= maxTime) {
        eventCount++;
        const event = nextClientTime < nextBusTime ? "Cliente" : "Bus";

        if (event === "Cliente") {
            clientCount++;
            currentTime = nextClientTime;
            nextClientTime = getNextClientTime(lambda, currentTime);
        } else {
            clientCount = 0;
            currentTime = nextBusTime;
            nextBusTime = getNextBusTime(currentTime);
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${eventCount}</td>
            <td>${currentTime.toFixed(4)}</td>
            <td>${event}</td>
            <td>${clientCount}</td>
            <td>${nextClientTime.toFixed(4)}</td>
            <td>${nextBusTime.toFixed(4)}</td>
        `;
        tableBody.appendChild(row);
    }
}

function getNextClientTime(lambda, currentTime) {
    const U = Math.random();
    const nextTime = (-Math.log(1 - U)) / lambda;
    return currentTime + nextTime;
}

function getNextBusTime(currentTime) {
    const U = Math.random();
    const Z = getZFromU(U);
    const mu = 4; // Media
    const sigma = 1; // Desviación estándar
    const nextTime = mu + sigma * Z;
    return currentTime + nextTime;
}

function getZFromU(U) {
    // Aproximación simple para obtener Z a partir de U (distribución normal estándar)
    // Para una implementación más precisa, se podría usar una librería como "statistics.js"
    return Math.sqrt(-2 * Math.log(U)) * Math.cos(2 * Math.PI * Math.random());
}