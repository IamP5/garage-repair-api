import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { CustomerService } from '../customer/customer.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {

  selectCarQuery = {
    id: true,
    model: true,
    brand: true,
    plate: true,
    customer: {
      select: {
        id: true,
        name: true,
        cpf: true,
      }
    }
  };

  constructor(
    private prismaService: PrismaService,
    private customerService: CustomerService
  ) { }

  async create(createCarDto: CreateCarDto, customerId: string) {
    
    const customer = await this.customerService.findOne(customerId);

    if(!customer) {
      throw new Error(`Customer not found`);
    }

    return await this.prismaService.car.create({
      data: {
        ...createCarDto,
        customer: {
          connect: {
            id: customerId
          }
        }
      },
    });
  }

  async findAll() {
    return await this.prismaService.car.findMany({
      select: {
        ...this.selectCarQuery,
        maintenance: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            updatedAt: true
          },
          where: {
            NOT: {
              status: 'DONE'
            }
          }
        }
      }
    });
  }

  async findOne(id: string) {
    const car = await this.prismaService.car.findUnique({
      where: { 
        id
      },
      select: {
        ...this.selectCarQuery,
        maintenance: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            updatedAt: true
          },
        }
      }
    });

    if(!car) {
      throw new Error('Car not Found');
    }

    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const car = await this.prismaService.car.findUnique({
      where: {
        id
      }
    });

    if(!car) {
      throw new Error('Car not found')
    }

    return this.prismaService.car.update({
      where: { 
        id 
      },
      data: updateCarDto
    });
  }
}
