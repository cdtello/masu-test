import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class Product {
  @IsNumber() @IsOptional() readonly id: number;
  @IsString() readonly title: string;
  @IsNumber() readonly description: number;
  @IsString() readonly price: string;
  @IsString() readonly discountPercentage: string;
  @IsString() readonly rating: string;
  @IsString() readonly stock: string;
  @IsString() readonly brand: string;
  @IsString() readonly category: string;
  @IsString() readonly thumbnail: string;
  @IsArray() @IsString({ each: true }) readonly images: string[];
}