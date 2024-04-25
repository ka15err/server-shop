const { faker } = require('@faker-js/faker');
('use strict');
const mebelManufacturers = [
  'DISTRILAB',
  'АИНА ИНКОМ',
  'КАРТ БЛАНШ',
  'СЫР ЖИХАЗЫ KZ',
  'Союз Мебель',
  'Алматинская Мебельная Фабрика',
  'Фурнитрейд',
  'ДАР-МЕБЕЛЬ',
  'Комфорт',
];
const typeMebel = [
  'Столы ',
  'Стулья',
  'Кресла',
  'Шкафы',
  'Файловые ящики',
  'Компьютерные стойки',
  'Конференц-столы',
  'Ресепшн-стойки',
  'Мягкая мебель',
  'Полки',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Mebels',
      [...Array(100)].map(() => ({
        mebel_manufacturer:
          mebelManufacturers[
            Math.floor(Math.random() * mebelManufacturers.length)
          ],
        type: typeMebel[Math.floor(Math.random() * typeMebel.length)],
        price: faker.string.numeric(6),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
        images: JSON.stringify([
          'https://images.satu.kz/30745590_stol-uglovoj-so.jpg',
          'https://images.satu.kz/30745590_stol-uglovoj-so.jpg',
          'https://images.satu.kz/30745590_stol-uglovoj-so.jpg',
        ]),
        vendor_code: faker.string.numeric(6),
        in_stock: faker.string.numeric(1),
        bestseller: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.string.numeric(3),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Mebels', null, {});
  },
};
