var apiUrlLecturers = "http://localhost:9090/lecturers";

async function fetchLecturers() {
    const apiUrl = apiUrlLecturers;
    try {
        const response = await fetch(apiUrl);
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
    const apiUrl = apiUrlLecturers;
    console.log(lecturer);
    const response = await fetch(apiUrl, {
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
}

async function fetchLecturer(id) {
    const apiUrl = apiUrlLecturers + `/${id}`;
    console.log("api url =" + apiUrl);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        let responseJson = await response.json();
        return responseJson;
    } catch (err) {
        console.log(err.message);
    }
}

async function updateLecturer(id, lecturer) {
    const apiUrl = apiUrlLecturers + `/${id}`;
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
    } catch (err) {
        console.log(err.message);
    }
}

async function deleteLecturer(id) {
    console.log("lecturer Id =" + id);
    const apiUrl = apiUrlLecturers + `/${id}`;
    console.log(apiUrl);
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
    } catch (err) {
        console.log(err.message);
    }
}

function activateSidebarLink(id) {
    let navlinkId = id;
    let linkElement = document.getElementById(navlinkId);
    let sidebarLinks = document.getElementsByClassName('nav-link');
    for (let element of sidebarLinks) {
        element.classList.remove('active');
    }
    if (linkElement != undefined) {
        linkElement.classList.add('active');
    }
}

export { activateSidebarLink };
export { deleteLecturer };
export { updateLecturer };
export { fetchLecturer };
export { fetchLecturers };
export { saveLecturer };