import { Injectable } from '@nestjs/common';
import { Mebels } from './mebels.model';
import { InjectModel } from '@nestjs/sequelize';
import { IMebelFiler, IMebelQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class MebelsService {
  constructor(
    @InjectModel(Mebels)
    private mebelsModel: typeof Mebels,
  ) {}
  async paginateAndFilter(
    query: IMebelQuery,
  ): Promise<{ count: number; rows: Mebels[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IMebelFiler>;
    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }
    if (query.mebel_manufacturer) {
      filter.mebel_manufacturer = JSON.parse(
        decodeURIComponent(query.mebel_manufacturer),
      );
    }

    if (query.type) {
      filter.type = JSON.parse(decodeURIComponent(query.type));
    }

    return this.mebelsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }
  async bestsellers(): Promise<{ count: number; rows: Mebels[] }> {
    return this.mebelsModel.findAndCountAll({
      where: { bestseller: true },
    });
  }
  async new(): Promise<{ count: number; rows: Mebels[] }> {
    return this.mebelsModel.findAndCountAll({
      where: { new: true },
    });
  }
  async findOne(id: number | string): Promise<Mebels> {
    return this.mebelsModel.findOne({
      where: { id },
    });
  }
  async findOneByName(name: string): Promise<Mebels> {
    return this.mebelsModel.findOne({
      where: { name },
    });
  }
  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: Mebels[] }> {
    return this.mebelsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
