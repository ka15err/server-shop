import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3001',
      'https://client-shop-vzp6.onrender.com',
      'https://mebel-ol0vlmj5s-ka15errs-projects.vercel.app',
      'https://mebel-kz.netlify.app/',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Офисные мебели')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
