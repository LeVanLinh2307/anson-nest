import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator'

export class createCustomerDto {
    @IsNumberString()
    id: number

    @IsEmail()
    email: string

    @IsNotEmpty()
    name: string
}