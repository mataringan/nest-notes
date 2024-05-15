import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { IExtendPaginationOptions } from "../../../common/interfaces/extend-pagination-options.interface";
import { QuerySortingHelper } from "../../../common/helpers/query-sorting.helper";
import { SORTING_COLUMNS_USER } from "../constants/sorting-columns.constant";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { UpdateUserDto } from "../dto/update-user.dto";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User>{
    const model = new User()
    this.userRepository.merge(model, createUserDto)

    return  await  this.userRepository.save(model)
  }

  findAll(options: IExtendPaginationOptions): Promise<Pagination<User>| User[]>{
    const {sortBy, search, paginateDisable} = options

    let qb = this.userRepository.createQueryBuilder('users')

    if(sortBy?.length){
      qb = QuerySortingHelper(qb, options.sortBy, SORTING_COLUMNS_USER)
    }

    if(search){
      qb.where(('name ilike :search OR email ilike :search'), {
        search: `%${search}%`
      })
    }

    if(paginateDisable){
      return qb.getMany()
    }

    return paginate<User>(qb, options)
  }

  async findOne(id: string){
    const user = await this.userRepository.findOne({
      where: {id}
    })

    if(!user){
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return user
  }

  async findOneByEmail(email: string){
    const user = await this.userRepository.findOne({
      where: {email}
    })

    return user
  }

  async getProfile(id: string): Promise<any>{
    const user = await this.findOne(id)

    return {
      name: user.name,
      email: user.email
    }
  }

  async update(id:string, updateUserDto: UpdateUserDto): Promise<User>{
    const user: User = await this.findOne(id)

    const model = new User()
    this.userRepository.merge(model, {...user}, updateUserDto)

    return await this.userRepository.save(model)
  }

  async remove(id: string): Promise<UpdateResult>{
    const user:User = await this.findOne(id)

    return await this.userRepository.createQueryBuilder('user')
      .softDelete()
      .where('id = :id', {id: user.id})
      .returning('*')
      .execute()
  }

}
