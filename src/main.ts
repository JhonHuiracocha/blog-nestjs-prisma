import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const globalPrefix: string = 'api';
  const port: number = config.get<number>('PORT');
  const environment: string = config.get<string>('NODE_ENV');

  app.enableCors();
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    Logger.log(`🚀 Server ready at http://localhost:${port}/${globalPrefix}`);
    Logger.log(`Running in ${environment}`);
  });
}
bootstrap();
