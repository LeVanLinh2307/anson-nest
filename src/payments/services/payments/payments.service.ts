import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePaymentDto } from 'src/payments/dto/CreatePayment.dto';

@Injectable()
export class PaymentsService {

    private users = [
        {
            email: 'lll@gmail.com'
        },
        {
            email: 'mmm@gmail.com'
        },
        {
            email: 'ttt@gmail.com'
        },
    ]
    async createPayment(createPaymentDto: CreatePaymentDto) {
        const { email } = createPaymentDto;
        const user = this.users.find(user => user.email === email)
        if (user) {
            return {
                id: 1,
                status: 'success'
            }
        } else {
            throw new BadRequestException()
        }
    }
}
