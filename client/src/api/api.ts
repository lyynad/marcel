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

export const getBooksWithReferences = async () => {
    const url = BASE_URL + '/books/scratchers';

    const response = await fetch(url);
    if (!response.ok) console.log ("Failed to fetch books with references.");

    return await response.json();
}

export const getBooksByReference = async (references: string[]) => {
    const url = BASE_URL + '/books/search-by-reference'

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            references: references
        })
    });

    if (!response.ok) console.log ("Failed to fetch by reference.");

    return await response.json();
}