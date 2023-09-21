import { IsEmail, IsString } from 'class-validator';

export class EmailNotifyDto{
  @IsEmail()
  email: string;
  @IsString()
  text: string;
}
