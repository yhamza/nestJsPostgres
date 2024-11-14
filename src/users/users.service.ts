import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { UpdateUserDto } from './dtos/UpdateUserDto.dto';
import { Equal, Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/Users';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository : Repository<User>
        ){}


    async findAll(): Promise<any>   
        {
           try {
             return await this.userRepository.find();
           } catch (error) {
             console.error('Error fetching all users:', error);
             throw new Error('Internal server error');
           }
         }
       
    async findUser(data :  any): Promise<any> {
           try {

            
            //  return await this.userRepository.findOneBy({ id: Equal(id) });
            const users = await this.userRepository
            .createQueryBuilder('users')
            .select('users.username')
            .where('users.username like :name', { name: data.username })
            .getMany();
          
          return users
            
           } catch (error) {
             console.error('Error finding user:', error);
             throw new Error('Internal server error'); 
           }
         }


    async createUser(user : CreateUserDto){
        try{
            const newUser = this.userRepository.create(user);
            await this.userRepository.save(newUser);
            return newUser;
        }catch{
            throw new BadRequestException('Invalid request data');
        }
    }
    async deleteUser(id: number): Promise<any> {
        try {
          const userToDelete = await this.userRepository.findOneBy({ id });
    
          if (!userToDelete) {
            return ("user not found")
          }
    
          
          await this.userRepository.delete(userToDelete.id);

          return ("user deleted")
        } catch (error) {
          console.error('Error deleting user:', error);
          throw new Error('Internal server error');
        }
      }
    
    async updateUser(id: number, user: UpdateUserDto): Promise<any> {
        try {
        
        console.log(id);
        console.log(user);
        
          
          const userToUpdate = await this.userRepository.findOneBy({ id });
    
          if (!userToUpdate) {
            throw new NotFoundException('User not found');
          }
    
          Object.assign(userToUpdate, user);
    
          const savedUser = await this.userRepository.save(userToUpdate);
    
          return savedUser;
        } catch (error) {
          console.error('Error updating user:', error);
          throw new Error('Internal server error'); 
        }
      }



}

