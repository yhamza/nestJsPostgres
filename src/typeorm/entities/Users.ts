import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity ({name : 'users'})
export class User{
    
    
    @PrimaryGeneratedColumn({type : 'bigint'})
    @PrimaryColumn()
    id : number ;


    @Column({unique : true})
    username : string 
    
    @Column()
    password : string ;

    @Column({default : new Date()})
    date : Date;


    @Column({nullable : true})
    authStrategy : string;



}
