import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {

  selectMaintenanceQuery = {
    id: true,
    status: true,
    car: {
      select: {
        id: true,
        model: true,
        brand: true,
        plate: true,
      }
    },
    customer: {
      select: {
        id: true,
        name: true,
        cpf: true,
      }
    }
  };

  constructor(private prismaService: PrismaService) { }

  async create({ carId, customerId }: CreateMaintenanceDto) {
    const customer = await this.prismaService.customer.findUnique({
      where: {
        id: customerId
      },
    })

    const car = await this.prismaService.car.findUnique({
      where: {
        id: carId
      }
    });

    if(!car) {
      throw new Error('Car not found');
    }

    if(!customer) {
      throw new Error('Customer not found');
    }

    return await this.prismaService.maintenance.create({
      data: {
        car: {
          connect: {
            id: carId
          }
        },
        customer: {
          connect: {
            id: customerId
          }
        }
      }
    })
  }

  async findAll() {
    return await this.prismaService.maintenance.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: this.selectMaintenanceQuery
    });
  }

  findOne(id: string) {
    return this.prismaService.maintenance.findUnique({
      where: {
        id,
      },
      select: this.selectMaintenanceQuery
    });
  }

  findByCarId(carId: string) {
    return this.prismaService.maintenance.findMany({
      where: {
        carId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  update(id: string, { status }: UpdateMaintenanceDto) {
    return this.prismaService.maintenance.update({
      where: {
        id,
      },
      data: {
        status,
      },
      select: this.selectMaintenanceQuery
    })
  }
}
