import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
    
    const [books, setBooks] = useState([]);
    
    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    };

    const editBookById = async (id, newTitle) => {

        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return {...book, ...response.data};
            }
            return book;
        });
        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });
        setBooks(updatedBooks);
    };

    const createBook = async (title) => {

        const response = await axios.post('http://localhost:3001/books', {
            title: title
        });

        console.log('Need to add book with title: ', title);
        const updatedBooks = [
            ...books,
            response.data
        ];
        setBooks(updatedBooks);

    };

    const valueToShare = {
        books: books,
        deleteBookById: deleteBookById,
        editBookById: editBookById,
        createBook: createBook,
        fetchBooks: fetchBooks
    };

    return <BooksContext.Provider value={valueToShare}>
        {children}
    </BooksContext.Provider>
};

export default BooksContext;
export { Provider };