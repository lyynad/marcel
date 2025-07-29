import { IsOptional, IsPositive, IsArray, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from "mongoose";

class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    page?: number;
}

class SearchByReferenceBodyDto {
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    @Type(() => Types.ObjectId)
    references?: Types.ObjectId[];  
}

export { PaginationQueryDto, SearchByReferenceBodyDto };