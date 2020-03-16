import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductQuestionDTO } from '../dto/question/create-product-questio.dto';
import { ProductQuestion } from '../product-question.entity';
import { Product } from '../product.entity';
import { AuthGuard } from '@nestjs/passport';
import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/message';

@Controller('product/:id/question')
@UseGuards(AuthGuard('jwt'))
export class ProductQuestionController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductQuestion)
    private readonly productQuestionRepository: Repository<ProductQuestion>,

    private readonly messageService: MessageService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Param('id') productId: number,
    @Body() createProductQuestionDto: CreateProductQuestionDTO,
    @Request() request,
  ) {
    const product = await this.productRepository.findOne(productId);
    const question = createProductQuestionDto.toModel(product, request.user);
    this.productQuestionRepository.save(question);

    const messageTitle = `Você tem uma nova pergunta sobre seus produtos!`;
    const messageBody = `Produto: ${product.name}\nPergunta: ${question.title}`;

    const message = new Message(
      request.user.login,
      product.user.login,
      messageTitle,
      messageBody,
    );
    this.messageService.sendMessage(message);
  }
}
