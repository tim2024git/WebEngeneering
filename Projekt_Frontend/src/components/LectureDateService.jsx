const apiUrlLectureDates = "http://localhost:9090/lecture-dates";

async function fetchLectureDates() {
    try {
        const response = await fetch(apiUrlLectureDates);
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
    const response = await fetch(apiUrlLectureDates, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lectureDate),
    });

    if (!response.ok) {
        throw new Error(`Error saving lecture date: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

async function fetchLectureDate(id) {
    const apiUrl = `${apiUrlLectureDates}/${id}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        throw new Error(`Error fetching lecture date: ${error.message}`);
    }
}

async function updateLectureDate(id, lectureDate) {
    const apiUrl = `${apiUrlLectureDates}/${id}`;
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
    } catch (error) {
        throw new Error(`Error updating lecture date: ${error.message}`);
    }
}

async function deleteLectureDate(id) {
    const apiUrl = `${apiUrlLectureDates}/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error deleting lecture date: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error deleting lecture date: ${error.message}`);
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

export {
    activateSidebarLink,
    deleteLectureDate,
    updateLectureDate,
    fetchLectureDate,
    fetchLectureDates,
    saveLectureDate
};