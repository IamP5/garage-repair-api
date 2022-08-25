import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {

  constructor(private prismaService: PrismaService) { }

  async create(createCustomerDto: CreateCustomerDto) {
    return this.prismaService.customer.create({
      data: createCustomerDto
    });
  }

  async findAll() {
    return this.prismaService.customer.findMany();
  }

  async findOne(id: string) {
    const customer = await this.prismaService.customer.findUnique({
      where: { 
        id
      }
    });

    if(!customer) {
      throw new Error('Customer not Found');
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.prismaService.customer.findUnique({
      where: {
        id
      }
    });

    if(!customer) {
      throw new Error('Customer not found')
    }

    return this.prismaService.customer.update({
      where: { 
        id 
      },
      data: updateCustomerDto
    });
  }
}
