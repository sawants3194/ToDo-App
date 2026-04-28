process.env.NODE_ENV = "test";
require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');

const { app, connectDB } = require('../index');

describe('Auth Routes', () => {
    let mockSignedUpUser;

    const testUser = {
        name: 'S D Sawant',
        email: 'userTest1@gmail.com',
        password: '12345',
    };

    const signinUser = {
        name: 'S D Sawant',
        email: 'userTest2@gmail.com',
        password: '12345',
    };

    beforeAll(async () => {
        await connectDB();
        await User.deleteMany({});
        await User.create(signinUser);
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    // SIGNUP SUCCESS
    it('should sign up a new user', async () => {
        const res = await request(app).post('/api/v1/user/signup').send(testUser);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User signed up successfully');

        mockSignedUpUser = await User.findOne({ email: testUser.email });
        expect(mockSignedUpUser).not.toBeNull();
    });

    // SIGNUP FAIL (missing name)
    it('should fail to sign up with missing fields', async () => {
        const res = await request(app)
            .post('/api/v1/user/signup')
            .send({ email: 'abc@gmail.com', password: '12345' });

        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    msg: 'Name must be at least 3 characters long',
                }),
            ])
        );
    });

    // SIGNUP FAIL (duplicate email)
    it('should fail if email already exists', async () => {
        const res = await request(app).post('/api/v1/user/signup').send(signinUser);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Email already exists');
    });

    //  SIGNIN SUCCESS
    it('should sign in existing user', async () => {
        const res = await request(app).post('/api/v1/user/signin').send({
            email: signinUser.email,
            password: signinUser.password,
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User signed in successfully');
        expect(res.body).toHaveProperty('token');
    });

    // WRONG PASSWORD
    it('should return 401 if password is incorrect', async () => {
        const res = await request(app).post('/api/v1/user/signin').send({
            email: signinUser.email,
            password: 'wrongpassword',
        });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error', 'password does not match.');
    });

    //  USER NOT FOUND
    it('should return 404 if user does not exist', async () => {
        const res = await request(app).post('/api/v1/user/signin').send({
            email: 'notfound@gmail.com',
            password: '12345',
        });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'User does not exists');
    });

    // SIGNOUT
    it('should sign out user successfully', async () => {
        const signinRes = await request(app).post('/api/v1/user/signin').send({
            email: signinUser.email,
            password: signinUser.password,
        });

        const cookie = signinRes.headers['set-cookie'][0];

        const res = await request(app)
            .get('/api/v1/user/signout')
            .set('Cookie', cookie);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User signout successful');
    });
});