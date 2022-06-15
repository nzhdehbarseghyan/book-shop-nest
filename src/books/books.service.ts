import { Injectable } from '@nestjs/common';
import { BOOKS } from "../books.mock";

@Injectable()
export class BooksService {
    private books = BOOKS;

    getAllBooks() {
        return this.books;

    }

    getBookByName(name: string) {
        return this.books.find(book => book.title === name);
    }

    addNewBook(data) {
        this.books.push(data);
        return this.books;
    }

    updateBookById(data) {
        let book = this.books.find(book => book.id === data.id);
        book = data;
        return book;
    }

    deleteBookById(id: number) {
        const index = this.books.findIndex(book => book.id === id);
        console.log(' index ', index);
        this.books.splice(index, 1);
        return this.books;
    }
}