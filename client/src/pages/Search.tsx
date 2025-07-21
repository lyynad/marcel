import "./Search.css";

import searchIcon from "../assets/Search.svg";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { getBooks } from "../api/api";
import { useEffect, useState } from "react";
import type { Book } from "../types/book";

function Search () {
    const [booksList, setBooksList] = useState<Book[]>();
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getBooks();
            setBooksList(data);
        };

        fetchData();
    }, [])

    return (
        <div style ={{ width: "100%" }}>

            <div className="search-container">
                <div className="wrapper">
                    <div className="search-bar">
                        <img src={searchIcon} className="search-icon" alt="Search icon" />
                        <input type="text" className="search-input" placeholder="Search something in particular" />
                    </div>
                    <div className="library-container">
                        {booksList?.map((book) => (
                            <div key={book._id} className="book-card">
                                <img src={book.coverImage} alt={book.title} className="book-cover" />
                                <div className="book-info">
                                    <h3 className="book-title">{book.title}</h3>
                                    <p className="book-description">{book.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Search;