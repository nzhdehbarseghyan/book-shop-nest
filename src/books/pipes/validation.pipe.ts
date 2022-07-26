import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform< string | number, string | number > {
    transform(value: string | number, metadata: ArgumentMetadata): string | number {
        console.log('<< transform >> ', metadata);
        return value;
    }
}
