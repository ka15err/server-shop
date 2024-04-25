import { faker } from '@faker-js/faker';
import { Op } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

class Mebels {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  mebel_manufacturer: string;

  @ApiProperty({ example: 12345 })
  price: string;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  type: string;

  @ApiProperty({ example: faker.internet.password() })
  vendor_code: string;

  @ApiProperty({ example: faker.lorem.word() })
  name: string;

  @ApiProperty({ example: faker.lorem.sentence() })
  description: string;

  @ApiProperty({ example: faker.image.city() })
  images: string;

  @ApiProperty({ example: 5 })
  in_stock: number;

  @ApiProperty({ example: true })
  bestseller: boolean;

  @ApiProperty({ example: false })
  new: boolean;

  @ApiProperty({ example: 123 })
  popularity: number;

  @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Mebels, isArray: true })
  rows: Mebels;
}

export class Bestsellers extends Mebels {
  @ApiProperty({ example: true })
  bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Mebels, isArray: true })
  rows: Bestsellers;
}

export class NewParts extends Mebels {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Mebels, isArray: true })
  rows: NewParts;
}

export class SearchByLetterResponse extends Mebels {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}

export class SearchRequest {
  @ApiProperty({ example: 'r' })
  search: string;
}

export class GetByNameResponse extends Mebels {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class GetByNameRequest {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class FindOneResponse extends Mebels {}

export interface IMebelQuery {
  limit: string;
  offset: string;
  mebel_manufacturer: string | undefined;
  type: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}

export interface IMebelFiler {
  mebel_manufacturer: string | undefined;
  type: string | undefined;
  price: { [Op.between]: number[] };
}
// export interface IMebelQuery {
//   mebel_manufacturer: string | undefined;
//   type: string | undefined;
//   price: { [Op.between]: number[] };
// }
