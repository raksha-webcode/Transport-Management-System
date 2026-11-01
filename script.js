
let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
let drivers = JSON.parse(localStorage.getItem("drivers")) || [];
let trips = JSON.parse(localStorage.getItem("trips")) || [];

function saveData() {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    localStorage.setItem("drivers", JSON.stringify(drivers));
    localStorage.setItem("trips", JSON.stringify(trips));
}

function renderData() {
    document.getElementById("vehicleCount").textContent = vehicles.length;
    document.getElementById("driverCount").textContent = drivers.length;
    document.getElementById("tripCount").textContent = trips.length;

    document.getElementById("vehicleList").innerHTML =
        vehicles.map((v, i) => `
        <tr>
            <td>${v.number}</td>
            <td>${v.type}</td>
            <td><button class="delete" onclick="deleteItem('vehicles', ${i})">Delete</button></td>
        </tr>`).join("");

    document.getElementById("driverList").innerHTML =
        drivers.map((d, i) => `
        <tr>
            <td>${d.name}</td>
            <td>${d.phone}</td>
            <td><button class="delete" onclick="deleteItem('drivers', ${i})">Delete</button></td>
        </tr>`).join("");

    document.getElementById("tripList").innerHTML =
        trips.map((t, i) => `
        <tr>
            <td>${t.source}</td>
            <td>${t.destination}</td>
            <td><button class="delete" onclick="deleteItem('trips', ${i})">Delete</button></td>
        </tr>`).join("");
}

document.getElementById("vehicleForm").addEventListener("submit", function(e) {
    e.preventDefault();

    vehicles.push({
        number: document.getElementById("vehicleNumber").value.trim(),
        type: document.getElementById("vehicleType").value.trim()
    });

    saveData();
    renderData();
    this.reset();
});

document.getElementById("driverForm").addEventListener("submit", function(e) {
    e.preventDefault();

    drivers.push({
        name: document.getElementById("driverName").value.trim(),
        phone: document.getElementById("driverPhone").value.trim()
    });

    saveData();
    renderData();
    this.reset();
});

document.getElementById("tripForm").addEventListener("submit", function(e) {
    e.preventDefault();

    trips.push({
        source: document.getElementById("source").value.trim(),
        destination: document.getElementById("destination").value.trim()
    });

    saveData();
    renderData();
    this.reset();
});

function deleteItem(type, index) {
    if (confirm("Are you sure you want to delete this record?")) {
        if (type === "vehicles") vehicles.splice(index, 1);
        if (type === "drivers") drivers.splice(index, 1);
        if (type === "trips") trips.splice(index, 1);

        saveData();
        renderData();
    }
}

renderData();
