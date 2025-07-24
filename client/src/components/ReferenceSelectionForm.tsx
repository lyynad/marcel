import { useState, useEffect } from "react";
import "./ReferenceSelectionForm.css";

import * as api from "../api/api";

import type { Book } from "../types/book";

import Loading from "./Loading";

interface ReferenceSelectionFormProps {
    toggleReferencesSelection: () => void;
    currentReferences: Book[];
    handleReferences: (references: Book[]) => void;
}

function ReferenceSelectionForm({ toggleReferencesSelection, currentReferences, handleReferences }: ReferenceSelectionFormProps) {
    const [booksList, setBooksList] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedReferences, setSelectedReferences] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooksWithReferences = async () => {
            try {
                const data = await api.getBooksWithReferences();
                setBooksList(data);
                setSelectedReferences(currentReferences);
            } catch (error) {
                console.error("Failed to fetch books with references:", error);
            } finally {
                setLoading(false);
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
        if (selectedReferences.some(ref => ref._id === book._id))
            setSelectedReferences(selectedReferences.filter(el => el._id !== book._id));
        else
            setSelectedReferences([...selectedReferences, book]);
    }

    const handleConfirmClick = () => {
        handleReferences(selectedReferences);
    }
    
    return (
        <>
            <div className="overlay" onClick={toggleReferencesSelection}></div>

                <div className="reference-selection-form">
                    {loading ? 
                        <Loading /> :
                        booksList?.map((book) => (
                            <div key={book._id} className={`book-card-small ${selectedReferences.some(ref => ref._id === book._id) ? "reference-added" : ""}`} onClick={() => {handleReferenceSelection(book)}} >
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
                        ))
                    }

                    <button className="references-accept-button" onClick={handleConfirmClick}>CONFIRM</button>
                </div>
        </>
    );
}

export default ReferenceSelectionForm;