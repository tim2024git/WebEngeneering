const apiUrlStudyPrograms = "http://localhost:9090/studyprograms";

async function fetchStudyPrograms() {
    try {
        const response = await fetch(apiUrlStudyPrograms);
        if (!response.ok) {
            throw new Error(`HTTP error: The status is ${response.status}`);
        }
        const studyPrograms = await response.json();
        return studyPrograms;
    } catch (error) {
        throw new Error(`Error fetching study programs: ${error.message}`);
    }
}

async function saveStudyProgram(studyProgram) {
    try {
        const response = await fetch(apiUrlStudyPrograms, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studyProgram),
        });

        if (response.ok) {
            console.log("Studiengang erfolgreich erstellt!");
        } else {
            console.log("Fehler bei der Erstellung des Studiengangs!");
        }
    } catch (error) {
        console.error(`Error saving study program: ${error.message}`);
    }
}

async function fetchStudyProgram(id) {
    const apiUrl = `${apiUrlStudyPrograms}/${id}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const studyProgram = await response.json();
        return studyProgram;
    } catch (error) {
        console.error(`Error fetching study program: ${error.message}`);
    }
}

async function updateStudyProgram(id, studyProgram) {
    const apiUrl = `${apiUrlStudyPrograms}/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studyProgram),
        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
    } catch (error) {
        console.error(`Error updating study program: ${error.message}`);
    }
}

async function deleteStudyProgram(id) {
    const apiUrl = `${apiUrlStudyPrograms}/${id}`;
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
        console.error(`Error deleting study program: ${error.message}`);
    }
}

function activateSidebarLink(id) {
    const linkElement = document.getElementById(id);
    const sidebarLinks = document.getElementsByClassName('nav-link');
    for (const element of sidebarLinks) {
        element.classList.remove('active');
    }
    if (linkElement !== undefined) {
        linkElement.classList.add('active');
    }
}

export {
    activateSidebarLink,
    deleteStudyProgram,
    updateStudyProgram,
    fetchStudyProgram,
    fetchStudyPrograms,
    saveStudyProgram
};