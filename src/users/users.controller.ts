import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query, Session, UseGuards,
} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {AuthService} from "./auth.service";
import {CurrentUser} from "./decorators/current-user.decorator";
import {User} from "./user.entity";
import {AuthGuard} from "../guards/auth.guard";
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService:UsersService,
                private authService:AuthService ) {}

    @Post('/signup')
    async signup(@Body() body:CreateUserDto,@Session() session:any) {
        const user =  await this.authService.signUp(body.email,body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user:User){
        return user;
    }
    @Post('/signout')

    signout(@Session() session:any) {
        session.userId = null;
    }

    @Post('/signin')
    async signin(@Body() body:CreateUserDto,@Session() session:any) {
        const user = await this.authService.signIn(body.email,body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/:id')
    async findUser(@Param('id') id:string) {
        const user = await this.usersService.findOne(parseInt(id));
        console.log('Handler is running')
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string) {
        return this.usersService.remove(parseInt(id));
    }
    @Patch("/:id")
    updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){
        return this.usersService.update(parseInt(id),body);
    }

}
