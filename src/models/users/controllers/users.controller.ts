import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "../providers/users.service";
import { User } from "../entities/user.entity";
import { ApiPaginatedResponse } from "../../../common/decorators/api-paginate-response.decorator";
import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";
import { Pagination } from "nestjs-typeorm-paginate";

@ApiTags('Users')
@Controller('users')
export class UsersController{
  constructor(private usersService: UsersService){}

  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiPaginatedResponse(User)
  @Get()
  async findAll(@Query() query: PaginationQueryDto): Promise<Pagination<User>|User[]>{
   const {page, limit, sortBy, search, paginateDisable} = query;

   const result = await this.usersService.findAll({
      limit,
      page,
      search,
      sortBy: Array.isArray(sortBy) ? sortBy : [sortBy],
      paginateDisable,
    });

   return  result
  }
}