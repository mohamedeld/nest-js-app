import { Controller,Get,Post,Patch,Delete, Param, Req, Body, HttpCode } from "@nestjs/common";
import { Request } from "express";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";
@Controller('users')
export class UserController{
    @Get()
    findAllUsers():string[]{
        return ["ahmed","hassan","ali"]
    }

    @Get(':id')
    findOne(@Param('id') id:number,@Req() request:Request):string{
        return `one user with ${id} and ${request.params.id}`;
    }

    @Post()
    @HttpCode(201)
    createUser(@Body() userData:CreateUserDTO){
        return userData;
    }
    
    @Patch(':id')
    updateUser(@Param('id') id:number,@Body() UpdateUserDTO:UpdateUserDTO){
        return UpdateUserDTO
    }

    @Delete(':id')
    removeUser(@Param('id') id:number):string{
        return 'remove user';
    }
}