import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { id: createOrderDto.customerId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const productIds = createOrderDto.productIds;
    const products = await this.productRepository.findBy({ id: In(productIds) });
    
    if (products.length !== productIds.length) {
      throw new NotFoundException('One or more product IDs are invalid');
    }

    let totalAmount = 0;
    for (const product of products) {
      if (product.stock <= 0) {
        throw new NotFoundException(`Product ${product.id} is out of stock`);
      }
      totalAmount += Number(product.price);
      product.stock -= 1; 
      await this.productRepository.save(product); 
    }
    
    const order = this.orderRepository.create({ ...createOrderDto, user, productIds, totalAmount });
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ where: { isActive: true } });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.orderRepository.find({ where: { user, isActive: true } });
  }

  async update(id: string, updateOrderDto: Partial<CreateOrderDto>): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async deactivate(id: string): Promise<void> {
    const order = await this.findOne(id);
    order.isActive = false; 
    await this.orderRepository.save(order);
  }

  async activate(id: string): Promise<void> {
    const order = await this.findOne(id);
    order.isActive = true; 
    await this.orderRepository.save(order);
  }
}
