import { Controller, Get, Post, Put, Delete, Req, Request, Param, Body, Res, HttpException,
    HttpStatus} from '@nestjs/common';
import { CreateBookDto } from './dto';
import {BooksService} from './books.service';

@Controller('books')
export class BooksController {
    constructor(
        private bookService: BooksService,
    ) {}

    @Get()
    async getAll(@Req() request: Request): Promise<CreateBookDto[]> {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        const books = await this.bookService.getAllBooks();
        console.log('books ', books);
        return books;
    }

    @Get(':name')
    async getByName(@Param('name') name: string, @Res() res): Promise<CreateBookDto> {
        console.log('Name >> ', name);
        const book = await this.bookService.getBookByName(name);
        console.log('book by name', book);
        return res.status(200).send({
            message: 'Success!',
            book
        });
    }

    @Post()
    async addNewBook(@Body() bookData: CreateBookDto): Promise<CreateBookDto[]> {
        console.log('bookData ', bookData);
        const books = await this.bookService.addNewBook(bookData);
        console.log('books added new one', books);
        return books;
    }

    @Put()
    async updateBook(@Body() bookData: CreateBookDto, @Res() res): Promise<any> {
        console.log('bookData', bookData);
        const book = await this.bookService.updateBookById(bookData);
        console.log('book', book);
        return res.status(200).send({
            message: 'Success',
            book
        });
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string, @Res() res): Promise<{}> {
        console.log('id >>', id);
        const books = await this.bookService.deleteBookById(+id);
        console.log('books', books);

        return res.status(200).send({
            message: 'Success!',
            books
        })
    }
}
