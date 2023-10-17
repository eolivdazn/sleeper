import { CardDto } from './card.dto';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateChargeDto {
  @IsNumber()
  @Field()
  amount: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  @Field(() => CardDto)
  card: CardDto;
}
