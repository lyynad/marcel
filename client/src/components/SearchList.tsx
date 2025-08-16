
import "./SearchList.css";

import type { Book } from "../types/book";

interface SearchListProps {
    bookList: Book[]
}

function SearchList({ bookList }: SearchListProps) {
    return (
        <>
            <ul className="book-list">
                {bookList.map(book => (
                    <li key={book._id} className="book-list-item">
                        <img className="book-list-item-cover-image" src={book.coverImage} />
                        <span className="book-list-item-title">{book.title}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default SearchList;