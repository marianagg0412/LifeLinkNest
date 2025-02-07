import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product> 
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(limit: number = 10, offset: number = 0) {
    return await this.productRepository.find({
      where: { isActive: 1 },
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOne({
        where: { id: term, isActive: 1 },
      });
    } else {
      product = await this.productRepository
        .createQueryBuilder('product')
        .where('LOWER(product.name) = :name', { name: term.toLowerCase() })
        .andWhere('product.isActive = :isActive', { isActive: true })
        .getOne();
    }

    if (!product) {
      throw new NotFoundException(`Active product with term "${term}" not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({ id, ...updateProductDto });

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async deactivate(id: string) {
    const product = await this.findOne(id);
    
    product.isActive = 0;
    await this.productRepository.save(product);

    return { message: `Product #${id} has been deactivated.` };
  }

  async reactivate(id: string) {
    const product = await this.productRepository.findOne({
      where: { id, isActive: 0 },
    });

    if (!product) throw new NotFoundException(`Product #${id} is not deactivated.`);

    product.isActive = 1;
    await this.productRepository.save(product);

    return { message: `Product #${id} has been reactivated.` };
  }

  private handleDBExceptions(error: any){

    if(error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
