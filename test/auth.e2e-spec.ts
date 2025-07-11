import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handles a signup request', () => {
        const email='testsss@test.com'
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({email,password:'password'})
            .expect(201)
            .then(response => {
                expect(response.body.id).toBeDefined();
            })
    });
    it('signup as new user then get the current user', async () => {
        const email='testsss@test.com'
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({email,password:'password'})
            .expect(201)
        const cookie = res.get('Set-Cookie')
        const {body: user}=await request(app.getHttpServer())
        .get('/auth/whoami')
        .set('Cookie',cookie)
        .expect(200)

        expect(user.email).toEqual(email)
    })
});
