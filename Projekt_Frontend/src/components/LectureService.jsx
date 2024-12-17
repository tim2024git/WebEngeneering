const apiUrlLectures = "http://localhost:9090/lectures";

async function fetchLectures() {
    try {
        const response = await fetch(apiUrlLectures);
        if (!response.ok) {
            throw new Error(`HTTP error: The status is ${response.status}`);
        }
        const lectures = await response.json();
        return lectures;
    } catch (error) {
        throw new Error(`Error fetching lectures: ${error.message}`);
    }
}

async function saveLecture(lecture) {
    try {
        const response = await fetch(apiUrlLectures, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecture),
        });

        if (response.ok) {
            console.log("Vorlesung erfolgreich erstellt!");
        } else {
            console.log("Fehler bei der Erstellung der Vorlesung!");
        }
    } catch (error) {
        console.error(`Error saving lecture: ${error.message}`);
    }
}

async function fetchLecture(id) {
    const apiUrl = `${apiUrlLectures}/${id}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const lecture = await response.json();
        return lecture;
    } catch (error) {
        console.error(`Error fetching lecture: ${error.message}`);
    }
}

async function updateLecture(id, lecture) {
    const apiUrl = `${apiUrlLectures}/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecture),
        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
    } catch (error) {
        console.error(`Error updating lecture: ${error.message}`);
    }
}

async function deleteLecture(id) {
    const apiUrl = `${apiUrlLectures}/${id}`;
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
        console.error(`Error deleting lecture: ${error.message}`);
    }
}

function activateSidebarLink(id) {
    const linkElement = document.getElementById(id);
    const sidebarLinks = document.getElementsByClassName('nav-link');
    for (const element of sidebarLinks) {
        element.classList.remove('active');
    }
    if (linkElement) { // Sicherstellen, dass linkElement nicht null ist
        linkElement.classList.add('active');
    } else {
        console.warn(`Element with id ${id} not found.`);
    }
}

export {
    activateSidebarLink,
    deleteLecture,
    updateLecture,
    fetchLecture,
    fetchLectures,
    saveLecture
};