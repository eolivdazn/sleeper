import { Injectable } from '@nestjs/common';
import { EmailNotifyDto } from './dto/email-notify.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      accessToken:
        'ya29.a0AfB_byChAehZMnlGRl2zSbRfBri7BNcQwEWt1xfJW2h-C87T32Yd1XFAPgRVwIfHsVYY6gEhHpPWjKdE_mvme87u151Rl62DVwPyZtjsGxRQjtN2lJ9IFI6odYkAZEPsaf39NtAhWXamflk8pp18C4YZXnPwfrpuR6leaCgYKAdcSARMSFQGOcNnCkQFLKIxweLouKzPGIQZWOg0171',
      // clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      // clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      // refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });
  async notifyEmail({ email }: EmailNotifyDto) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: 'sleeprexercise@gmail.com',
      subject: 'Payment received',
      text: 'Thank you for your payment',

    });
  }
}
