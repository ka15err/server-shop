import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/users.model';
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  // Метод для создания опций конфигурации Sequelize
  createSequelizeOptions(): SequelizeModuleOptions {
    // Извлечение параметров подключения к базе данных из конфигурации
    const {
      sql: { dialect, logging, host, port, username, password, database },
    } = this.configService.get('database');

    // Формирование объекта опций SequelizeModuleOptions
    return {
      dialect, // Диалект СУБД (например, 'mysql', 'postgres')
      logging, // Флаг логгирования запросов к базе данных
      host, // Хост базы данных
      port, // Порт базы данных
      username, // Имя пользователя базы данных
      password, // Пароль пользователя базы данных
      database, // Название базы данных
      models: [User], // Массив моделей Sequelize для использования
      autoLoadModels: true, // Автоматическая загрузка определенных моделей
      synchronize: true, // Автоматическая синхронизация моделей с базой данных
      define: {
        // Дополнительные опции определения моделей
        charset: 'utf8', // Кодировка по умолчанию
        collate: 'utf8_general_ci', // Сортировка по умолчанию
      },
    };
  }
}
