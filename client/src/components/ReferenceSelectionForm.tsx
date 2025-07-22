import { useState, useEffect } from "react";
import "./ReferenceSelectionForm.css";

import * as api from "../api/api";

import type { Book } from "../types/book";

interface ReferenceSelectionFormProps {
    toggleReferencesSelection: () => void;
}

function ReferenceSelectionForm({ toggleReferencesSelection }: ReferenceSelectionFormProps) {
    const [booksList, setBooksList] = useState<Book[]>([]);
    const [selectedReferences, setSelectedReferences] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooksWithReferences = async () => {
            try {
                const data = await api.getBooksWithReferences();
                setBooksList(data);
            } catch (error) {
                console.error("Failed to fetch books with references:", error);
            }
        };

        fetchBooksWithReferences();

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                toggleReferencesSelection();
            }
        });

        return () => {
            document.removeEventListener("keydown", toggleReferencesSelection);
        }
    }, []);

    const handleReferenceSelection = (book: Book) => {
        if (selectedReferences.includes(book))
            setSelectedReferences(selectedReferences.filter(el => el !== book));
        else
            setSelectedReferences([...selectedReferences, book]);
    }
    
    return (
        <>
            <div className="overlay" onClick={toggleReferencesSelection}></div>

                <div className="reference-selection-form">
                    {booksList?.map((book) => (
                        <div key={book._id} className={`book-card-small ${selectedReferences.includes(book) ? "reference-added" : ""}`} onClick={() => {handleReferenceSelection(book)}} >
                            <img src={book.coverImage} alt={book.title} className="cover-image-small" />
                            <div className="book-info-small">
                                <h3 className="book-title-small">{book.title}</h3>
                                <div className="book-tags-small">
                                    {book.royalroadTags?.map((tag) => (
                                        <div key={tag} className="book-tag-small">{tag}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        </>
    );
}

export default ReferenceSelectionForm;