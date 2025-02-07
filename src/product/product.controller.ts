import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.productService.deactivate(id);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id/reactivate')
  reactivate(@Param('id') id: string) {
    return this.productService.reactivate(id);
  }
}
