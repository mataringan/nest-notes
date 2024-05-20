import { Body, Controller, Delete, Get, Param, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "../providers/users.service";
import { User } from "../entities/user.entity";
import { ApiPaginatedResponse } from "../../../common/decorators/api-paginate-response.decorator";
import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";
import { Pagination } from "nestjs-typeorm-paginate";
import { ApiBaseResponse } from "../../../common/decorators/api-base-response.decorator";
import { UpdateUserDto } from "../dto/update-user.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { FilterUserDto } from "../dto/filter-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import { Roles } from "../../../common/decorators/roles.decorator";
import { RoleGuard } from "../../../common/guards/role.guard";

@ApiTags('Users')
@Controller('users')
export class UsersController{
  constructor(private usersService: UsersService){}

  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiPaginatedResponse(User)
  @Get()
  async findAll(@Query() query: PaginationQueryDto, @Query() filter: FilterUserDto): Promise<Pagination<UserResponseDto>|UserResponseDto[]>{
   const {page, limit, sortBy, search, paginateDisable} = query;

   const result = await this.usersService.findAll({
      limit,
      page,
      search,
      sortBy: Array.isArray(sortBy) ? sortBy : [sortBy],
      paginateDisable,
    },
     filter
   );

   return  result
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update user by token',
  })
  @ApiBearerAuth()
  @Put('/update/me')
  @ApiBaseResponse(User)
  update(@Req() req, @Body() payload: UpdateUserDto){
    return this.usersService.update(req.user.id, payload)
  }

  @ApiOperation({
    summary: 'Update user by id',
  })
  @Put(':id')
  @ApiBaseResponse(User)
  updateById(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto){
    return this.usersService.update(id, payload)
  }


  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBaseResponse(User)
  @Roles(['admin'])
  @Delete(':id')
  delete(@Param('id') id: string){
    return this.usersService.remove(id)
  }
}