import "./Search.css";

import searchIcon from "../assets/Search.svg";

import { Link } from "react-router-dom";

import { getBooks } from "../api/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useScrollToggle } from "../hooks/useScrollToggle";

import type { Book } from "../types/book";

import ReferenceSelectionForm from "../components/ReferenceSelectionForm";

function Search () {
    const [booksList, setBooksList] = useState<Book[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    
    const [showReferencesSelection, setShowReferencesSelection] = useState<boolean>(false);
    const [references, setReferences] = useState<string[]>([]);

    useScrollToggle(showReferencesSelection);

    useEffect(() => {
        const pageParam = searchParams.get("page");
        const page = pageParam ? parseInt(pageParam, 10) : 1;

        const fetchData = async () => {
            try {
                const data = await getBooks(page);
                setBooksList(data);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || (newPage > page && booksList && booksList.length < 10)) return;    
        setSearchParams({ page: newPage.toString() });
    }

    const toggleReferencesSelection = () => {
        setShowReferencesSelection(!showReferencesSelection);
    }

    return (
        <div style ={{ width: "100%" }}>
            
            {showReferencesSelection && <ReferenceSelectionForm toggleReferencesSelection={toggleReferencesSelection} /> }

            <div className="search-container">
                <div className="wrapper">
                    <div className="search-bar">
                        <img src={searchIcon} className="search-icon" alt="Search icon" />
                        <input type="text" className="search-input" placeholder="Search something in particular" />
                    </div>
                    <button className="set-references-button" onClick={toggleReferencesSelection}>+ Add References</button>
                    <div className="library-container">
                        {booksList?.map((book) => (
                            <Link to={`/book/${book._id}`} className="book-link" key={book._id}>
                                <div key={book._id} className="book-card">
                                    <img src={book.coverImage} alt={book.title} className="book-cover" />
                                    <div className="book-info">
                                        <h3 className="book-title">{book.title}</h3>
                                        <p className="book-description">{book.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <div className="page-controls">
                            <div className="control-arrow" onClick={() => { handlePageChange (page - 1)}}>
                                <span className="arrow">&lt;</span>
                            </div>
                            <div className="control-page-number">
                                <span className="page-number">{page}</span>
                            </div>
                            <div className="control-arrow" onClick={() => { handlePageChange (page + 1)}}>
                                <span className="arrow">&gt;</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Search;