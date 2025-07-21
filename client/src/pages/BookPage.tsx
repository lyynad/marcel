import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { Book } from "../types/book";

import * as api from "../api/api";

function BookPage() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                const data = await api.getBook(id);
                setBook(data);
            }
        }

        fetchBook();
    }, []);

    return (
        <>
            <div className="book-page-container">
                {book ? (
                    <>
                        <img src={book.coverImage} alt={book.title} className="book-cover-large" />
                        <div className="book-info-large">

                        </div>
                    </>
                ) : ""}
            </div>
        </>
    )
}

export default BookPage;