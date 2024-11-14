import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/Users';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port:5432,
    username: 'postgres',
    password: '123',
    database: 'postgres',
    entities:[User],
    synchronize : true
    

  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
