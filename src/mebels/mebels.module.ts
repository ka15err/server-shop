import { Module } from '@nestjs/common';
import { MebelsController } from './mebels.controller';
import { MebelsService } from './mebels.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mebels } from './mebels.model';

@Module({
  imports: [SequelizeModule.forFeature([Mebels])],
  controllers: [MebelsController],
  providers: [MebelsService],
  exports: [MebelsService],
})
export class MebelsModule {}
