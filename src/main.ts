import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ApiExceptionFilter } from './middlewares/exception_filter.middleware';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { InvalidDataException } from './exceptions/invalid_data.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const httpAdapterHost = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('app.api_prefix'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new InvalidDataException(errors),
    }),
  );
  app.useGlobalFilters(new ApiExceptionFilter(httpAdapterHost));

  await app.listen(configService.get('app.port'));
}
bootstrap();
