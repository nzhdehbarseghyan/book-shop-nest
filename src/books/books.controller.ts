import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    Request,
    Res,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import {CreateBookDto} from './dto';
import {BooksService} from './books.service';
import {HttpExceptionFilter} from './http-exception.filter';
import {ValidationPipe} from './pipes';
import { AuthGuard } from "./guards";

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  async getAll(@Req() request: Request): Promise<CreateBookDto[]> {
    try {
      const books = await this.bookService.getAllBooks();

      return books;
    } catch (e) {
      throw new BadRequestException();
    }
  }

    @Get(':name')
    async getByName(@Param('name', ValidationPipe) name: string, @Res() res): Promise<CreateBookDto> {
        const book = await this.bookService.getBookByName(name);

        return res.status(200).send({
            message: 'Success!',
            book,
        });
    }

    @Post()
    async addNewBook(@Body() bookData: CreateBookDto): Promise<CreateBookDto[]> {
        return this.bookService.addNewBook(bookData);
    }

    @Put()
    async updateBook(@Body() bookData: CreateBookDto, @Res() res): Promise<any> {
        const book = await this.bookService.updateBookById(bookData);

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
