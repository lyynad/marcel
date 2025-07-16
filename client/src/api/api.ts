const BASE_URL = "http://localhost:3000/api"

export const getBooks = async () => {
    const url = new URL(BASE_URL + "/books");

    const response = await fetch(url);
    if (!response.ok) console.log ("Failed to fetch books.");

    return await response.json();
}