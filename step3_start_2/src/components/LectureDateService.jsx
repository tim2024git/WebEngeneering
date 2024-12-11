var apiUrlLectureDates = "http://localhost:9090/lecture-dates";

async function fetchLectureDates() {
    const apiUrl = apiUrlLectureDates;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error: The status is ${response.status}`);
        }
        const lectureDates = await response.json();
        return lectureDates;
    } catch (error) {
        throw new Error(`Error fetching lecture dates: ${error.message}`);
    }
}

async function saveLectureDate(lectureDate) {
    const apiUrl = apiUrlLectureDates;
    console.log(lectureDate);
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lectureDate),
    });

    if (response.ok) {
        console.log("Vorlesungstermin erfolgreich erstellt!");
    } else {
        console.log("Fehler bei der Erstellung des Vorlesungstermins!");
    }
}

async function fetchLectureDate(id) {
    const apiUrl = apiUrlLectureDates + `/${id}`;
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

async function updateLectureDate(id, lectureDate) {
    const apiUrl = apiUrlLectureDates + `/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lectureDate),
        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function deleteLectureDate(id) {
    console.log("lecture date Id =" + id);
    const apiUrl = apiUrlLectureDates + `/${id}`;
    console.log(apiUrl);
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Die Anfrage für den Vorlesungstermin wurde erfolgreich gesendet!');
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
export { deleteLectureDate };
export { updateLectureDate };
export { fetchLectureDate };
export { fetchLectureDates };
export { saveLectureDate };