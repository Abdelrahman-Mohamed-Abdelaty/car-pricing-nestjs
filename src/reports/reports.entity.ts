import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../users/user.entity";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    price:number;

    @Column()
    make:string;

    @Column()
    model:string;

    @Column()
    year:number;

    @Column()
    mileage:number;

    @Column()
    lng:number;

    @Column()
    lat:number;

    @Column({default:false})
    approved:boolean;

    @ManyToOne(()=>User, user=>user.reports)
    user:User;
}