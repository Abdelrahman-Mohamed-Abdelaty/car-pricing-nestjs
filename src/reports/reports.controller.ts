import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {ReportsService} from "./reports.service";
import {AuthGuard} from "../guards/auth.guard";
import {User} from "../users/user.entity";
import {CurrentUser} from "../users/decorators/current-user.decorator";
import {ReportDto} from "./dtos/report.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {ApproveReportDto} from "./dtos/approve-report.dto";
import {AdminGuard} from "../guards/admin.guard";
import {GetEstimateDto} from "./dtos/get-esitmate.dto";

@Controller('reports')
export class ReportsController {

    constructor(private reportsService:ReportsService) {
    }
    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    async createReport(@Body() body:CreateReportDto,@CurrentUser() user:User) {
        return await this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approve(@Param('id') id:string,@Body() body:ApproveReportDto){
        return this.reportsService.approvedChange(parseInt(id),body.approved);
    }

    @Get()
    getEstimate(@Query() query:GetEstimateDto){
        return this.reportsService.createEstimate(query);

    }
}
