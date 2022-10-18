import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsService } from 'src/payments/services/payments/payments.service';
import { PaymentsController } from './payments.controller';
import { BadRequestException } from '@nestjs/common/exceptions';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  const requestMock = {
    query: {},
  } as unknown as Request

  const statusResponseMock = {
    send: jest.fn((x) => x)
  }

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x)
  } as unknown as Response

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x)
          }
        }
      ]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENTS_SERVICE')
  });

  it('payments services should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe(`getPayments`, () => {
    it(`Should return a status of 400`, async () => {
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing count or page'
      })
    });
    it('should return a status of 200', () => {
      requestMock.query = {
        count: '10',
        page: '1'
      }
      controller.getPayments(requestMock, responseMock)
      expect(responseMock.send).toHaveBeenCalledWith(200)
    })
  })

  describe('createPayment', () => {
    it('should return successfull response', async () => {
      jest.spyOn(paymentsService, 'createPayment').mockImplementationOnce(() => {
        throw new BadRequestException()
      })
      try {
        const response = await controller.createPayment({
          email: 'lll1@gmail.com',
          price: 100
        })
      } catch (error) {
        console.log(error);

      }
    })
  })
});
