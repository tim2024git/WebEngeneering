var apiUrlStudyClasses = "http://localhost:9090/studyclasses";

async function fetchStudyClasses() {
    try {
        const response = await fetch(apiUrlStudyClasses);
        if (!response.ok) {
            throw new Error(`HTTP error: The status is ${response.status}`);
        }
        const studyClasses = await response.json();
        return studyClasses;
    } catch (error) {
        throw new Error(`Error fetching study classes: ${error.message}`);
    }
}

async function saveStudyClass(studyClass) {
    const response = await fetch(apiUrlStudyClasses, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studyClass),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fehler beim Hinzufügen der Studienklasse');
    }

    const data = await response.json();
    return data;
}

async function fetchStudyClass(id) {
    const apiUrl = `${apiUrlStudyClasses}/${id}`;
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

async function updateStudyClass(id, studyClass) {
    const apiUrl = `${apiUrlStudyClasses}/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studyClass),
        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function deleteStudyClass(id) {
    const apiUrl = `${apiUrlStudyClasses}/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Fehler bei der Anfrage:', response.status, response.statusText);
        }
    } catch (err) {
        console.log(err.message);
    }
}

function activateSidebarLink(id) {
    let linkElement = document.getElementById(id);
    let sidebarLinks = document.getElementsByClassName('nav-link');
    for (let element of sidebarLinks) {
        element.classList.remove('active');
    }
    if (linkElement !== undefined) {
        linkElement.classList.add('active');
    }
}

export { activateSidebarLink, deleteStudyClass, updateStudyClass, fetchStudyClass, fetchStudyClasses, saveStudyClass };