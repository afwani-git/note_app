import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isConnected = getConnection('default').isConnected;

  console.log(`${isConnected ? 'db is connected' : 'db not connected !'}`);

  await app.listen(3000);
}
bootstrap();
