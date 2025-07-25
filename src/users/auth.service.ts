import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {UsersService} from "./users.service";
import {promisify} from "util";
import {randomBytes, scrypt as _scrypt} from "crypto";

@Injectable()
export class AuthService {
    constructor(private usersService:UsersService){}

    private readonly scrypt = promisify(_scrypt);

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await this.scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid password');
        }
        return user;
    }

    async signUp(email: string, password: string) {
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await this.scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        return await this.usersService.create(email, result);
    }

}