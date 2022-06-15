import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookMiddleware } from "./middlewares";


@Module({
    controllers: [BooksController],
    providers: [BooksService]
})

export class BooksModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BookMiddleware)
            .forRoutes(BooksController)
    }
}
