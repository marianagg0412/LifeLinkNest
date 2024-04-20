import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Product.name)
    private readonly productModel:Model<Product>
  ){}


  async create(createProductDto: CreateProductDto) {
    createProductDto.tittle=createProductDto.tittle.toLocaleLowerCase();
    try{
      //insertion con modelo
      //unica linea que se necesita sin validaciones
      const product= await this.productModel.create(createProductDto);
      return product;

    } catch (error) {
      //num de error de que ya existe en la base de datos
      this.handleExceptions(error);
    }
    return createProductDto;
  }

  findAll(paginationDto: PaginationDto) {
    console.log(+process.env.DEFAULT_LIMIT)

    const { limit = this.defaultLimit, offset=0 } = paginationDto;

    return this.productModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      no: 1
    })
    .select('-__v');
  }

  async findOne(term: string) {
    let product: Product;

    if (!isNaN(+term)){
      product = await this.productModel.findOne({no: term});
    }

    //MONGO ID
    if(!product && isValidObjectId(term)){
      product=await this.productModel.findById(term);
    }
    //Name
    if(!product){
      product=await this.productModel.findOne({name: term.toLocaleLowerCase().trim()});
    }

    if(!product) 
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);

    return product;
  }

  async update(term: string, updateProductDto: UpdateProductDto) {

    const pokemon =await this.findOne(term);

    if(updateProductDto.tittle)
      updateProductDto.tittle = updateProductDto.tittle.toLocaleLowerCase();


    try{
      
      await pokemon.updateOne(updateProductDto);
      return {...pokemon.toJSON(), ...updateProductDto};

    } catch (error){

      this.handleExceptions(error);
    
    }

    
  }

  async remove(id: string) {
  
    //BORRAR Y VERIFICA SI ALGO NO EXISTE CONSULTANDO SOLO UNA VEZ LA BASE DE DATOS
    const {deletedCount} = await this.productModel.deleteOne({_id:id});
    if(deletedCount===0)
      throw new BadRequestException(`Product with id "${id} not found"`)

    return;
  }

  private handleExceptions (error: any) {
    //num de error de que ya existe en la base de datos
    if (error.code===11000){
      throw new BadRequestException(`User already exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon = Chck server logs`);
  }
}
