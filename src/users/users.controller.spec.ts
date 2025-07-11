import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import {User} from "./user.entity";
import { NotFoundException } from '@nestjs/common';


describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService:Partial<UsersService>;
  let fakeAuthService:Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne:(id:number)=>Promise.resolve({id,email:"dslkfjsl@sjflks.com",password:'fkjsdlf' }as User),
      find:(email:string)=>{
        return Promise.resolve([{id:1,email,password:"jsdlkfsj"} as User])
      },
      // remove:()=>{},
      // update:()=>{}
    };
    fakeAuthService = {
      // signUp:()=>{},
      signIn:(email, password)=>{
        return Promise.resolve({id:1,email,password} as User)
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide:UsersService,
          useValue:fakeUsersService,
        },{
        provide:AuthService,
        useValue:fakeAuthService,
        }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findAllUsers returns an array of users', async () => {
    const users = await controller.findAllUsers('kjdks@jfsl.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('kjdks@jfsl.com')
  })
  it('findUser returns a single user', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  })
  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });
  it('signin update session object and returns user', async () => {
    const session = {userId:null};
    const user = await controller.signin(
        {email:"sjlfk@fskfjsl.com",password:"dlksjlf"},
        session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })
});
