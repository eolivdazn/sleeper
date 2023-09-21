import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/paymentsCreateCharge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(this.configService.get('STRIPE'), {
    apiVersion: '2022-11-15',
  });

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'gbp',
      payment_method: 'pm_card_visa',
    });

    this.notificationsService.emit('notify_email', {
      email,
      text: `Payment received for £${amount * 100} with card ${card.number} ${
        card.exp_month
      }/${card.exp_year} and CVC ${card.cvc} `,
    });
    return paymentIntent;
  }
}
