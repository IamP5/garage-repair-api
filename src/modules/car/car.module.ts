import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [DatabaseModule, CustomerModule],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
