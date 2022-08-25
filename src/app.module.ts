import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    DatabaseModule, 
    CustomerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
