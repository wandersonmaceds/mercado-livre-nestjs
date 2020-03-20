import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductQuestionDTO } from '../dto/question/create-product-questio.dto';
import { ProductQuestion } from '../product-question.entity';
import { Product } from '../product.entity';

@Controller('product/:id/question')
@UseGuards(AuthGuard('jwt'))
export class ProductQuestionController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductQuestion)
    private readonly productQuestionRepository: Repository<ProductQuestion>,
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

    await this.productQuestionRepository.save(question);
    question.notifyAskedQuestion();
  }
}
