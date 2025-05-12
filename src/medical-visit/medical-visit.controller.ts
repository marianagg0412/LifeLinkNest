import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalVisitService } from './medical-visit.service';
import { CreateMedicalVisitDto } from './dto/create-medical-visit.dto';
import { UpdateMedicalVisitDto } from './dto/update-medical-visit.dto';

@Controller('medical-visits')
export class MedicalVisitController {
  constructor(private readonly medicalVisitService: MedicalVisitService) {}

  @Post()
  create(@Body() createMedicalVisitDto: CreateMedicalVisitDto) {
    return this.medicalVisitService.create(createMedicalVisitDto);
  }

  @Get()
  findAll() {
    return this.medicalVisitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalVisitService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.medicalVisitService.findByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalVisitDto: UpdateMedicalVisitDto) {
    return this.medicalVisitService.update(id, updateMedicalVisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalVisitService.remove(id);
  }
}
