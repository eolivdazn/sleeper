import { IsEmail } from "class-validator";

export class EmailNotifyDto{
  @IsEmail()
  email: string;
}
