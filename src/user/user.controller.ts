import { Controller,Get,Post,Patch,Delete, Param, Req, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { Request } from "express";
import {v4 as uuid} from "uuid";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";
@Controller('users')
export class UserController{

    private readonly users:UserEntity[] = [];

    @Get()
    findAllUsers():UserEntity[]{
        return this.users;
    }

    @Get(':id')
    findOne(@Param('id') id:string):UserEntity{
        return this.users.find(user => user.id === id);
    }

    @Post()
    @HttpCode(201)
    createUser(@Body() createUserDTO:CreateUserDTO){
        const newUser:UserEntity = {
            ...createUserDTO,
            id:uuid()
        }
        this.users.push(newUser);
        return newUser;
    }
    
    @Patch(':id')
    updateUser(@Param('id') id:string,@Body() updateUserDTO:UpdateUserDTO){
        const userIndex = this.users.findIndex(user => user.id === id)
        this.users[userIndex] = {
            ...this.users[userIndex],
            ...UpdateUserDTO
        }
        return this.users[userIndex];
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeUser(@Param('id') id:string){
        const userIndex = this.users.findIndex(user => user.id === id);
        this.users.splice(userIndex,1);
    }
}