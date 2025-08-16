import { useState, type ChangeEvent, useEffect } from "react";
import * as api from "../api/api";

import "./SearchInput.css";

import searchIcon from "../assets/Search.svg";
import { type Book } from "../types/book";

interface SearchInputProps {
    handleSearchedList: (list: Book[]) => void
}

function SearchInput({ handleSearchedList }: SearchInputProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchData = debounce(async () => {
            const matchingBooks = await api.getBooksByQuery(searchQuery);

            handleSearchedList(matchingBooks);
        }, 300);

        if (searchQuery != "")
            fetchData();
        else
            handleSearchedList([]);
    }, [searchQuery]);

    const debounce = (func: any, delay: number) => {
        let timer: ReturnType<typeof setTimeout>;

        return function() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func()
            }, delay);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="search-bar">
            <img src={searchIcon} className="search-icon" alt="Search icon" />
            <input type="text" className="search-input" placeholder="Search something in particular" onChange={handleInputChange} />
        </div>
    )
}

export default SearchInput;