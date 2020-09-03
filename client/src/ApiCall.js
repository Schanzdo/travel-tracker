const API_URL = process.env.REACT_APP_TRAVEL_BE_URL;

export async function listTrackEntries() {
    const response = await fetch(`${API_URL}/api/tracks`);
    return await response.json();

}

export async function createTrackEntry(entry) {
    console.log("cc" + JSON.stringify(entry))
    const response = await fetch(`${API_URL}/api/tracks`,{
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(entry),
    });
    return await response.json();

}
