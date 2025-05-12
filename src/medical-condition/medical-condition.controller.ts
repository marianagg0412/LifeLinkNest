import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MedicalConditionService } from './medical-condition.service';
import { CreateMedicalConditionDto } from './dto/create-medical-condition.dto';
import { UpdateMedicalConditionDto } from './dto/update-medical-condition.dto';

@Controller('medical-conditions')
export class MedicalConditionController {
  constructor(private readonly service: MedicalConditionService) {}

  @Post()
  create(@Body() dto: CreateMedicalConditionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMedicalConditionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}