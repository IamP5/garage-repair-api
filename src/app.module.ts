import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [
    DatabaseModule, 
    CustomerModule, MaintenanceModule, CarModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
