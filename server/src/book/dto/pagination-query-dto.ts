import { IsOptional, IsPositive } from 'class-validator';

class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @IsPositive()
    page?: number;
}

export { PaginationQueryDto };