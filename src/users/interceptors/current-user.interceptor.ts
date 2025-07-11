import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {UsersService} from "../users.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userServie:UsersService) {}
    async intercept(context: ExecutionContext, handler: CallHandler<any>){
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session||{};
        console.log(userId)
        if(userId){
            request.currentUser = await this.userServie.findOne(userId);
        }
        return handler.handle();
    }
}