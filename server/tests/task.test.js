process.env.NODE_ENV = "test";

require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');

const { app, connectDB } = require('../index');
const User = require('../models/user');
const Task = require('../models/task');

describe('Task Routes', () => {
  let user;
  let token;
  let task;

  const userData = {
    name: 'Task User',
    email: 'taskuser@gmail.com',
    password: '12345',
  };

  const testTask = {
    title: 'Test Task',
    description: 'Test Description',
    state: 'active',
    taskDate: new Date().toISOString(),
  };

  beforeAll(async () => {
    await connectDB();
    await User.deleteMany({});
    await Task.deleteMany({});

    // Signup
    await request(app)
      .post('/api/v1/user/signup')
      .send(userData);

    // Signin
    const signinRes = await request(app)
      .post('/api/v1/user/signin')
      .send({
        email: userData.email,
        password: userData.password,
      });

    token = signinRes.body.token;
    user = signinRes.body.user;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
    await mongoose.connection.close();
  });

  // CREATE TASK
  it('should create a new task', async () => {
    const res = await request(app)
      .post(`/api/v1/task/create/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testTask);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.todo).toHaveProperty('title', testTask.title);

    task = res.body.todo;
  });

  // SEARCH TASK
  it('should search tasks', async () => {
    const res = await request(app)
      .get('/api/v1/task/search')
      .set('Authorization', `Bearer ${token}`)
      .query({ search: 'Test' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // SEARCH FAIL
  it('should fail if search query is missing', async () => {
    const res = await request(app)
      .get('/api/v1/task/search')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'search query is required');
  });

  // UPDATE TASK STATE
  it('should update task state', async () => {
    const res = await request(app)
      .put(`/api/v1/task/state/update/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ newState: 'completed' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('state', 'completed');
  });

  // UPDATE TASK DETAILS
  it('should update task details', async () => {
    const res = await request(app)
      .put(`/api/v1/task/update/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Task');
  });

  // GET TASK BY ID
  it('should get task by id', async () => {
    const res = await request(app)
      .get(`/api/v1/task/getById/${task._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('Success', true);
    expect(res.body.task).toHaveProperty('_id');
  });

  // GET ALL TASKS
  it('should get all tasks for user', async () => {
    const res = await request(app)
      .get(`/api/v1/task/getAll/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('groupedTasks');
    expect(res.body).toHaveProperty('totalPages');
  });

  // DELETE TASK (only completed)
//   it('should delete completed tasks', async () => {
//     const res = await request(app)
//       .delete('/api/v1/task/delete')
//       .set('Authorization', `Bearer ${token}`)
//       .send({ tasks: [task._id] });

//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty('message');
//   });

//   // DELETE FAIL
//   it('should fail delete if no tasks provided', async () => {
//     const res = await request(app)
//       .delete('/api/v1/task/delete')
//       .set('Authorization', `Bearer ${token}`)
//       .send({});

//     expect(res.status).toBe(400);
//     expect(res.body).toHaveProperty('message', 'No tasks to delete');
//   });
});