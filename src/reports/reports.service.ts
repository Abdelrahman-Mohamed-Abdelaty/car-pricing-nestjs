import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {Repository} from "typeorm";
import {Report} from "./reports.entity";
import {CreateReportDto} from "./dtos/create-report.dto";
import {GetEstimateDto} from "./dtos/get-esitmate.dto";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo:Repository<Report>) {}
    create(reportDto:CreateReportDto,user:User){
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }

    async approvedChange(id: number, approved: boolean) {
        const report = await this.repo.findOne({ where: { id} });
        if(!report){
            throw new NotFoundException('report not found');
        }
        await this.repo.update(
            { id },
            { approved }
        )
        return report;
    }
    createEstimate({make,model,lat,lng,year,mileage}:GetEstimateDto){
        return this.repo.createQueryBuilder()
            .select('AVG(price)','price')
            .where('make=:make', {make})
            .andWhere('model=:model', {model})
            .andWhere('lng - :lng BETWEEN -5 AND 5', {lng})
            .andWhere('lat - :lat BETWEEN -5 AND 5', {lat})
            .andWhere('year - :year BETWEEN -3 AND 3', {year})
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)','DESC')
            .setParameter('mileage', mileage)
            .limit(3)
            .getRawOne()
    }
}
