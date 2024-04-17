import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, isValidObjectId } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class UserService {

  private defaultLimit: number;

  constructor(
    @InjectModel(User.name)
    private readonly userModel:Model<User>
  ){}

  async create(createUserDto: CreateUserDto) {

    createUserDto.name=createUserDto.name.toLocaleLowerCase();
    try{
      //insertion con modelo
      //unica linea que se necesita sin validaciones
      const user= await this.userModel.create(createUserDto);
      return user;

    } catch (error) {
      //num de error de que ya existe en la base de datos
      this.handleExceptions(error);
    }
    return createUserDto;
  }

  findAll(paginationDto: PaginationDto) {



    console.log(+process.env.DEFAULT_LIMIT)

    const { limit = this.defaultLimit, offset=0 } = paginationDto;

    return this.userModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      no: 1
    })
    .select('-__v');
  }

  async findOne(term: string) {

    let user: User;

    if (!isNaN(+term)){
      user = await this.userModel.findOne({no: term});
    }

    //MONGO ID
    if(!user && isValidObjectId(term)){
      user=await this.userModel.findById(term);
    }
    //Name
    if(!user){
      user=await this.userModel.findOne({name: term.toLocaleLowerCase().trim()});
    }

    if(!user) 
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);

    return user;
  }

  async update(term: string, updatePokemonDto: UpdateUserDto) {

    const pokemon =await this.findOne(term);

    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();


    try{
      
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto};

    } catch (error){

      this.handleExceptions(error);
    
    }

    
  }

  async remove(id: string) {
    

    //BORRAR Y VERIFICA SI ALGO NO EXISTE CONSULTANDO SOLO UNA VEZ LA BASE DE DATOS
    const {deletedCount} = await this.userModel.deleteOne({_id:id});
    if(deletedCount===0)
      throw new BadRequestException(`Pokemon with id "${id} not found"`)

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
