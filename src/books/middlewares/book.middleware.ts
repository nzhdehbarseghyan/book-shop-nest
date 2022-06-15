import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class BookMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(' In middleware >>>>>>>');
        next();
    }
}
