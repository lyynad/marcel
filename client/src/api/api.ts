const BASE_URL = "http://localhost:3000/api";

export const getBooks = async (page?: number) => {
    const url = new URL(BASE_URL + `/books?page=${page || 1}`);

    const response = await fetch(url);
    if (!response.ok) console.log ("Failed to fetch books.");

    return await response.json();
}

export const getBook = async (id: string) => {
    const url = BASE_URL + `/books/${id}`;

    const response = await fetch(url);
    if (!response.ok) console.log ("Failed to fetch a book.");
    
    return await response.json();
}