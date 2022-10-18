import { Controller, Get, Req, Res, Inject, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDto } from '../../dto/CreatePayment.dto';
import { PaymentsService } from '../../services/payments/payments.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('payments')
export class PaymentsController {
    constructor(
        @Inject('PAYMENTS_SERVICE')
        private readonly paymentsService: PaymentsService
    ) { }

    @Get()
    getPayments(@Req() request: Request, @Res() response: Response) {
        const { count, page } = request.query;
        if (!count || !page) {
            response
                .status(400)
                .send({ msg: 'Missing count or page' })
        } else {
            response.send(200)
        }
    }

    @Post('create')
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        try {
            const response = await this.paymentsService.createPayment(createPaymentDto)
            return response
        } catch (error) {
            return error
        }
    }
}
