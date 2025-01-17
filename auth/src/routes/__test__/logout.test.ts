import request from 'supertest';
import { app } from '../../app';
import { loginUser, registerUser } from '../../test/helpers';

describe('Logout user', () => {
  it("clears the cookie after signing out", async () => {
    await registerUser({name: 'test', email: 'test@gmail.com', password: 'password'}).expect(201);
    
    await loginUser('test@gmail.com', 'password').expect(200);
    
      const response = await request(app)
        .post("/api/users/logout")
        .send({})
        .expect(200);
    
      const cookie = response.get("Set-Cookie");
  
      if (!cookie) {
        throw new Error("Expected cookie but got undefined.");
      }
    
      expect(cookie[0]).toEqual(
        "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
      );
    });
});

