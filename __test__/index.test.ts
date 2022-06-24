import { server } from "../src/index";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { User } from '../src/IUser';

const routes = '/api/users';

describe('1 SCENARIO: CRUD', () => {
  let user: User;
  user = {
    name: 'Tommy',
    age: 29,
    hobbies: ['guitar'],
  };

  it('Should response with empty array: []', async () => {
    const res = await request(server).get(routes);
    expect(res.body).toEqual([]);
    expect(res.statusCode).toEqual(200);
  });

  it('POST: should response with recorded info about new user', async () => {
     

    const res = await request(server).post(routes).send(user);
    user = res.body;

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(user);
    expect(res.body).toHaveProperty('id');
  });

  it('GET: /api/users/${id} should get user who has been created', async () => {
    const res = await request(server).get(`${routes}/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(user);
  });

  it('PUT: api/users/{userId}: should update user', async () => {
    const newName = { name: 'Updated', age: 23, hobbies: ['football'] };
    const res = await request(server).put(`${routes}/${user.id}`).send(newName);
    expect(res.body.id).toEqual(user.id);
    expect(res.body.name).toEqual(newName.name);
  });

  it('DELETE: api/users/{userId}: should delete user who has been stored earlier', async () => {
    const res = await request(server).delete(`${routes}/${user.id}`);
    expect(res.statusCode).toBe(204);
  });

  it('GET: api/users/{userId}: should try to get a deleted object by id', async () => {
    const res = await request(server).get(`${routes}/${user.id}`);
    expect(res.statusCode).toBe(404);
    const message = { message: 'User doesn\'t exist!' };
    expect(res.body).toEqual(message);
  });
});

describe('2 SCENARIO: Wrong Method', () => {
  it('PATCH: should try to set PATCH method', async () => {
    const res = await request(server).patch(routes);
    const message = { message: 'Resource doesn\'t exist!' };
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(message);
  });

  it('HEAD: should try to set HEAD method', async () => {
    const res = await request(server).copy(routes);
    const message = { message: 'Resource doesn\'t exist!' };
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(message);
  });
});

describe('3 SCENARIO: Handle errors', () => {
  it('GET user: should try to get user by wrong id', async () => {
    const wrongID = 'wrong-id-123';
    const res = await request(server).get(`${routes}/${wrongID}`);
    const message = { message: 'Id is not valid!' };
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(message);
  });

  it('GET user: should try to get user by non existing id', async () => {
    const notExistingID = '6cc7d9eb-5b99-4e0b-8607-7e587e5da432';
    const res = await request(server).get(`${routes}/${notExistingID}`);
    expect(res.statusCode).toEqual(404);
    const message = { message: 'User doesn\'t exist!' };
    expect(res.body).toEqual(message);
  });

  it('POST user: should try to make post method by wrong path', async () => {
    const wrongPath = '/abcd';
    const newUser = {
      username: 'Sasha',
      age: 33,
      hobbies: ['reading'],
    };

    const res = await request(server).post(`${routes}/${wrongPath}`).send(newUser);
    const message = { message: 'Resource doesn\'t exist!' };
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(message);
  });

  it('POST user: should try to create user without necessary fields', async () => {
    const newUser = {
      username: 'Tommy',
      hobbies: ['guitar'],
    };

    const res = await request(server).post(routes).send(newUser);
    const message = {
      name: "required",
      age: "required",
      hobbies: "required",
    };
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(message);
  });

  it('PUT user: should try to make put method to user by non existing id', async () => {
    const notExistingID = '6cc7d9eb-5b99-4e0b-8607-7e587e5da432';
    const body = {
      name: 'Misha',
      age: 21,
      hobbies:['swimming']
    };
    const res = await request(server).put(`${routes}/${notExistingID}`).send(body);
    expect(res.statusCode).toEqual(404);
    const message = { message: 'Id doesn\'t exist!' };
    expect(res.body).toEqual(message);
  });
});