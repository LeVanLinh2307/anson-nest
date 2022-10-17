import { Injectable } from '@nestjs/common';
import { createCustomerDto } from '../../dtos/CreateCustomer.dto';
import { Customer } from '../../types/Customer';

@Injectable()
export class CustomersService {
    private customers: Customer[] = [
        {
            id: 1,
            email: 'll@gmail.com',
            name: 'Dany Dany'
        },
        {
            id: 2,
            email: 'mm@gmail.com',
            name: 'Adam Adam'
        },
        {
            id: 3,
            email: 'tt@gmail.com',
            name: 'Money Money'
        }
    ]

    findCustomer(id: number) {
        return this.customers.find(user => user.id == id)
    }

    createCustomer(customerDto: createCustomerDto) {
        this.customers.push(customerDto)
        return this.customers
    }

    getAllCustomres() {
        return this.customers
    }
}
