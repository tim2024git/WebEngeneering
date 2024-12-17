const apiUrlLecturers = "http://localhost:9090/lecturers";

async function fetchLecturers() {
    try {
        const response = await fetch(apiUrlLecturers);
        if (!response.ok) {
            throw new Error(`HTTP error: The status is ${response.status}`);
        }
        const lecturers = await response.json();
        return lecturers;
    } catch (error) {
        throw new Error(`Error fetching lecturers: ${error.message}`);
    }
}

async function saveLecturer(lecturer) {
    try {
        const response = await fetch(apiUrlLecturers, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecturer),
        });

        if (response.ok) {
            console.log("Dozent erfolgreich erstellt!");
        } else {
            console.log("Fehler bei der Erstellung des Dozenten!");
        }
    } catch (error) {
        console.error(`Error saving lecturer: ${error.message}`);
    }
}

async function fetchLecturer(id) {
    const apiUrl = `${apiUrlLecturers}/${id}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const lecturer = await response.json();
        return lecturer;
    } catch (error) {
        console.error(`Error fetching lecturer: ${error.message}`);
    }
}

async function updateLecturer(id, lecturer) {
    const apiUrl = `${apiUrlLecturers}/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecturer),
        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
    } catch (error) {
        console.error(`Error updating lecturer: ${error.message}`);
    }
}

async function deleteLecturer(id) {
    const apiUrl = `${apiUrlLecturers}/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Die Anfrage wurde erfolgreich gesendet!');
        } else {
            console.error('Fehler bei der Anfrage:', response.status, response.statusText);
        }
    } catch (error) {
        console.error(`Error deleting lecturer: ${error.message}`);
    }
}

function activateSidebarLink(id) {
    const linkElement = document.getElementById(id);
    const sidebarLinks = document.getElementsByClassName('nav-link');
    for (const element of sidebarLinks) {
        element.classList.remove('active');
    }
    if (linkElement) {
        linkElement.classList.add('active');
    } else {
        console.warn(`Element with id ${id} not found.`);
    }
}

export {
    activateSidebarLink,
    deleteLecturer,
    updateLecturer,
    fetchLecturer,
    fetchLecturers,
    saveLecturer
};