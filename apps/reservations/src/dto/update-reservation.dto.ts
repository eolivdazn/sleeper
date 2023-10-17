import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
