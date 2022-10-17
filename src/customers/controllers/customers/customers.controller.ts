import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes } from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { Request, Response } from 'express';
import { createCustomerDto } from '../../dtos/CreateCustomer.dto';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService) {

    }

    @Get(':id')
    getCustomer(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        console.log(123);

        const customer = this.customerService.findCustomer(id)
        if (customer) {
            res.send(customer)
        } else {
            res.status(400).send('Not Found');
        }
    }

    @Get('/search/:id')
    searchCustomerById(@Param('id', ParseIntPipe) id: number) {
        const customer = this.customerService.findCustomer(id)
        if (customer) return customer
        else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto: createCustomerDto) {
        this.customerService.createCustomer(createCustomerDto)
    }

    @Get()
    getAllCustomer() {
        return this.customerService.getAllCustomres()
    }
}
