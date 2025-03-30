import { Controller, Post, Get, Param, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Auth(ValidRoles.admin)
  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get('user/:userId')
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.getOrdersByUserId(userId);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: Partial<CreateOrderDto>): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string): Promise<void> {
    return this.orderService.deactivate(id);
  }
  
  @Auth(ValidRoles.admin)
  @Patch(':id/activate')
  async activate(@Param('id') id: string): Promise<void> {
    return this.orderService.activate(id);
  }
}
