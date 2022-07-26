import { Controller, Get, Post, Put, Delete, Req, Request, Param, Body, Res, HttpException,
    HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CreateBookDto } from './dto';
import {BooksService} from './books.service';
import { ValidationPipe } from './pipes'

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
    async getByName(@Param('name', ValidationPipe) name: string, @Res() res): Promise<CreateBookDto> {
        const book = await this.bookService.getBookByName(name);

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
    async deleteById(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, @Res() res): Promise<{}> {
        const books = await this.bookService.deleteBookById(id);

        return res.status(200).send({
            message: 'Success!',
            books
        })
    }
}
