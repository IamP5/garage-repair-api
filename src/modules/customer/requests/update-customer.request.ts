import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.request';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
