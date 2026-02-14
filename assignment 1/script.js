let events = [];

function addEvent() {
    const title = document.getElementById("event-title").value.trim();
    const date = document.getElementById("event-date").value;
    const category = document.getElementById("event-category").value;
    const desc = document.getElementById("event-desc").value.trim();

    if (!title || !date) {
        alert("Please enter Event Title and Date!");
        return;
    }

    const newEvent = {
        id: Date.now(),
        title,
        date,
        category,
        desc
    };

    events.push(newEvent);
    renderEvents();
    clearForm();
}

function renderEvents() {
    const eventsList = document.getElementById("events-list");

    if (events.length === 0) {
        eventsList.innerHTML = "<p>No events yet. Add your First Event!</p>";
        return;
    }

    eventsList.innerHTML = "";

    events.forEach(event => {
        const eventCard = document.createElement("div");

        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p>${event.desc || ""}</p>
            <button onclick="deleteEvent(${event.id})">Delete</button>
        `;

        eventsList.appendChild(eventCard);
    });
}

function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    renderEvents();
}

function clearEvents() {
    if (confirm("Are you sure you want to delete all events?")) {
        events = [];
        renderEvents();
    }
}

function addSampleEvents() {
    events = [
        { id: 1, title: "AI Conference 2026", date: "2026-03-15", category: "Conference", desc: "Annual AI innovation summit." },
        { id: 2, title: "Web Dev Workshop", date: "2026-04-10", category: "Workshop", desc: "Hands-on JavaScript deep dive." }
    ];

    renderEvents();
}

function clearForm() {
    document.getElementById("event-title").value = "";
    document.getElementById("event-date").value = "";
    document.getElementById("event-desc").value = "";
}

document.addEventListener("keydown", function(event) {
    document.getElementById("key-name").textContent = event.key;
});