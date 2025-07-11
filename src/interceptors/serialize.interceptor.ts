import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {plainToInstance} from "class-transformer";

interface ClassConstructor {
    new(...args: any[]): any;
}
export function Serialize(dto:ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto:any) {
    }
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        return handler.handle().pipe(
            map(data => {
                return plainToInstance(this.dto,data,{
                    excludeExtraneousValues:true,
                })
            })
        )
    }
}