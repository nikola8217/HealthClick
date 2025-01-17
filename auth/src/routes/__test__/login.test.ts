import { loginUser, registerUser } from '../../test/helpers';

describe('Login user', () => {
      it('fails when a email that does not exist is supplied', async () => {
            await loginUser('test@gmail.com', 'password').expect(400);
      });
      
      it('fails when an incorrect password is supplied', async () => {
            await registerUser({name: 'test', email: 'test@gmail.com', password: 'password'}).expect(201);
          
            await loginUser('test@gmail.com', 'aslkdfjalskdfj').expect(400);
        });
      
      it('responds with a cookie when given valid credentials', async () => {
            await registerUser({name: 'test', email: 'test@gmail.com', password: 'password'}).expect(201);
        
            const response = await loginUser('test@gmail.com', 'password').expect(200);
        
            expect(response.body.token).toBeDefined();
      });
});

