import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Report} from "../reports/reports.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(()=>Report, report=>report.user)
    reports:Report[];

    @AfterInsert()
    logInsert() {
        console.log('user inserted','id',this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('user removed','id',this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('user updated','id',this.id);
    }

    @Column({default:true})
    admin:boolean;
}
