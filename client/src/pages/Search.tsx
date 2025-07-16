import "./Search.css";

import searchIcon from "../assets/Search.svg";

import Header from "../components/Header";

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
        <>
            <Header />

            <div className="search-container">
                <div className="search-bar">
                    <img src={searchIcon} className="search-icon" alt="Search icon" />
                    <input type="text" className="search-input" placeholder="Search something in particular" />
                </div>
                <div className="library-container">
                    {booksList?.map((book) => (
                        <div key={book._id}>{book.title}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Search;