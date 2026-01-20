/* ---------- GRAPH DATA ---------- */

const graphSvg = document.getElementById("graph");
const resultsDiv = document.getElementById("results");

const nodes = [
    { id: 0, name: "ASD", x: 530, y: 190, continent: "North America" },
    { id: 1, name: "USA", x: 210, y: 160, continent: "North America" },
    { id: 2, name: "Canada", x: 230, y: 90, continent: "North America" },
    { id: 3, name: "Mexico", x: 190, y: 210, continent: "North America" },
    { id: 4, name: "Cuba", x: 270, y: 210, continent: "North America" },
    { id: 5, name: "Greenland", x: 390, y: 60, continent: "North America" },
    { id: 6, name: "Brazil", x: 270, y: 280, continent: "South America" },
    { id: 7, name: "Argentina", x: 310, y: 380, continent: "South America" },
    { id: 8, name: "Chile", x: 300, y: 320, continent: "South America" },
    { id: 9, name: "Peru", x: 350, y: 310, continent: "South America" },
    { id: 10, name: "Colombia", x: 480, y: 250, continent: "South America" },
    { id: 11, name: "UK", x: 470, y: 110, continent: "Europe" },
    { id: 12, name: "France", x: 460, y: 150, continent: "Europe" },
    { id: 13, name: "Germany", x: 535, y: 130, continent: "Europe" },
    { id: 14, name: "Italy", x: 670, y: 85, continent: "Europe" },
    { id: 15, name: "Sweden", x: 530, y: 90, continent: "Europe" },
    { id: 16, name: "Egypt", x: 560, y: 290, continent: "Africa" },
    { id: 17, name: "Nigeria", x: 530, y: 320, continent: "Africa" },
    { id: 18, name: "Kenya", x: 600, y: 340, continent: "Africa" },
    { id: 19, name: "South Africa", x: 530, y: 370, continent: "Africa" },
    { id: 20, name: "Morocco", x: 490, y: 70, continent: "Africa" },
    { id: 21, name: "China", x: 640, y: 170, continent: "Asia" },
    { id: 22, name: "India", x: 680, y: 210, continent: "Asia" },
    { id: 23, name: "Japan", x: 720, y: 130, continent: "Asia" },
    { id: 24, name: "South Korea", x: 630, y: 120, continent: "Asia" },
    { id: 25, name: "Saudi Arabia", x: 600, y: 220, continent: "Asia" },
    { id: 26, name: "Australia", x: 880, y: 410, continent: "Oceania" },
    { id: 27, name: "New Zealand", x: 810, y: 360, continent: "Oceania" },
    { id: 28, name: "Indonesia", x: 840, y: 280, continent: "Oceania" },
    { id: 29, name: "Papua New Guinea", x: 730, y: 170, continent: "Oceania" },
    { id: 30, name: "Fiji", x: 790, y: 250, continent: "Oceania" }
];

const startNodeId = 0;
let edges = [];
let selectedNode = null;

/* ---------- SCATTER + LEADERBOARD ---------- */

let measurements = [];
let lastIndex = -1;

/* ---------- GRAPH DRAWING ---------- */

function drawGraph() {
    graphSvg.innerHTML = "";

    edges.forEach((e, i) => {
        const a = nodes[e.from];
        const b = nodes[e.to];

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", a.x);
        line.setAttribute("y1", a.y);
        line.setAttribute("x2", b.x);
        line.setAttribute("y2", b.y);
        line.setAttribute("class", "edge");

        line.onclick = ev => {
            ev.stopPropagation();
            edges.splice(i, 1);
            drawGraph();
        };

        graphSvg.appendChild(line);
    });

    nodes.forEach(n => {
        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", n.x);
        c.setAttribute("cy", n.y);
        c.setAttribute("r", 18);

        let cls = "node";
        if (n.id === startNodeId) cls += " start";
        else if (selectedNode === n.id) cls += " selected";
        c.setAttribute("class", cls);

        c.onclick = e => {
            e.stopPropagation();
            handleNodeClick(n.id);
        };

        const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.setAttribute("x", n.x);
        t.setAttribute("y", n.y);
        t.setAttribute("class", "node-label");
        t.textContent = n.id;

        graphSvg.appendChild(c);
        graphSvg.appendChild(t);
    });
}

function handleNodeClick(id) {
    if (selectedNode === null) selectedNode = id;
    else if (selectedNode !== id) {
        if (!edges.some(e =>
            (e.from === selectedNode && e.to === id) ||
            (e.from === id && e.to === selectedNode)
        )) {
            edges.push({ from: selectedNode, to: id });
        }
        selectedNode = null;
    } else selectedNode = null;

    drawGraph();
}

/* ---------- GRAPH GENERATORS ---------- */

function clearGraph() {
    edges = [];
    selectedNode = null;
    resultsDiv.innerHTML = "";
    drawGraph();
}

function randomGraph() {
    clearGraph();
    const p = 0.2;

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() < p) {
                edges.push({ from: i, to: j });
            }
        }
    }
    drawGraph();
}

function smallWorldGraph() {
    clearGraph();
    // Add local connections (within continents or nearby)
    const manualEdges = [
        // North America
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
        // South America
        { from: 8, to: 7 }, { from: 8, to: 6 }, { from: 8, to: 9 },
        // Europe
        { from: 11, to: 5 }, { from: 11, to: 20 }, { from: 11, to: 15 }, { from: 11, to: 13 }, { from: 11, to: 12 },
        // Africa
        { from: 16, to: 17 }, { from: 17, to: 18 }, { from: 17, to: 19 }, { from: 17, to: 10 },
        // Asia
        { from: 21, to: 22 }, { from: 21, to: 23 }, { from: 21, to: 24 }, { from: 21, to: 25 }, { from: 21, to: 14 }, { from: 21, to: 29 },
        // Oceania
        { from: 26, to: 27 }, { from: 27, to: 28 }, { from: 27, to: 30 },

        // Long-range shortcuts
        { from: 0, to: 21 }, // to Asia
        { from: 0, to: 27 }, // to Australia
        { from: 0, to: 17 }, // to Africe
        { from: 0, to: 8 },  // to SA
        { from: 0, to: 1 }, // ASD to USA
        { from: 0, to: 11 }   // ASD to Europe
    ];

    edges = manualEdges;
    drawGraph();
}

/* ---------- EVALUATION ---------- */

function evaluateGraph() {
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
        adj[e.from].push(e.to);
        adj[e.to].push(e.from);
    });

    const dist = {};
    nodes.forEach(n => dist[n.id] = Infinity);
    dist[startNodeId] = 0;

    const q = [startNodeId];
    while (q.length) {
        const v = q.shift();
        adj[v].forEach(nb => {
            if (dist[nb] === Infinity) {
                dist[nb] = dist[v] + 1;
                q.push(nb);
            }
        });
    }

    if (Object.values(dist).some(d => d === Infinity)) {
        resultsDiv.innerHTML = "<strong>Nem összefüggő gráf</strong>";
        return;
    }

    let sum = 0, count = 0;
    for (let id in dist) {
        if (+id !== startNodeId) {
            sum += dist[id];
            count++;
        }
    }

    const avg = sum / count;
    const area = edges.length * avg * 10;

    // Clustering Coefficient
    let clusteringSum = 0;
    nodes.forEach(n => {
        const neighbors = adj[n.id];
        const k = neighbors.length;
        if (k < 2) return;
        let links = 0;
        for (let i = 0; i < k; i++) {
            for (let j = i + 1; j < k; j++) {
                if (adj[neighbors[i]].includes(neighbors[j])) {
                    links++;
                }
            }
        }
        clusteringSum += (2 * links) / (k * (k - 1));
    });
    const avgClustering = clusteringSum / nodes.length;

    resultsDiv.innerHTML =
        `<strong>Élek száma:</strong> ${edges.length}<br>
   <strong>Átlagos útvonal:</strong> ${avg.toFixed(2)}<br>
   <strong>Klaszterezési együttható:</strong> ${avgClustering.toFixed(3)}<br>
   <strong>Pont:</strong> ${area.toFixed(2)}`;

    measurements.push({ edges: edges.length, avg, area });
    lastIndex = measurements.length - 1;

    updateChart();
    updateLeaderboard();
}

/* ---------- CHART.JS ---------- */

const scatterChart = new Chart(
    document.getElementById("scatterChart"),
    {
        type: "scatter",
        data: { datasets: [{ data: [], backgroundColor: [] }] },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: "Élek száma" }, beginAtZero: true },
                y: { title: { display: true, text: "Átlagos útvonal" }, beginAtZero: true }
            }
        }
    }
);

function updateChart() {
    scatterChart.data.datasets[0].data =
        measurements.map(m => ({ x: m.edges, y: m.avg }));

    scatterChart.data.datasets[0].backgroundColor =
        measurements.map((_, i) => i === lastIndex ? "red" : "steelblue");

    scatterChart.update();
}

/* ---------- LEADERBOARD ---------- */

function updateLeaderboard() {
    const tbody = document.getElementById("leaderBody");
    tbody.innerHTML = "";

    [...measurements]
        .map((m, i) => ({ ...m, index: i }))
        .sort((a, b) => a.area - b.area)
        .forEach((item, idx) => {
            const tr = document.createElement("tr");
            if (item.index === lastIndex) tr.className = "leader-new";

            const tdRank = document.createElement("td");
            tdRank.textContent = idx + 1;

            const tdEdges = document.createElement("td");
            tdEdges.textContent = item.edges;

            const tdAvg = document.createElement("td");
            tdAvg.textContent = item.avg.toFixed(2);

            const tdScore = document.createElement("td");
            tdScore.textContent = item.area.toFixed(2);

            tr.appendChild(tdRank);
            tr.appendChild(tdEdges);
            tr.appendChild(tdAvg);
            tr.appendChild(tdScore);
            tbody.appendChild(tr);
        });
}

/* ---------- EVENTS ---------- */

document.getElementById("eval-btn").onclick = evaluateGraph;
document.getElementById("clear-btn").onclick = clearGraph;
document.getElementById("random-btn").onclick = randomGraph;
document.getElementById("sw-btn").onclick = smallWorldGraph;

drawGraph();