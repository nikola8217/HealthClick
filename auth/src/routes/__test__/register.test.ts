import { registerUser } from '../../test/helpers';

describe('Register user', () => {
    it('returns a 201 on successful register', async () => {
        await registerUser({name: 'test', email: 'test@gmail.com', password: 'password'}).expect(201);
    });
    
    it('returns a 400 with an invalid email', async () => {
        await registerUser({name: 'test', email: 'alskdflaskjfd', password: 'password'}).expect(400);
    });
    
    it('returns a 400 with an invalid password', async () => {
        await registerUser({name: 'test', email: 'test@gmail.com', password: 'p'}).expect(400);
    });
    
    it('returns a 400 with missing name, email and password', async () => {
        await registerUser({name: '', email: 'test@gmail.com', password: 'password'}).expect(400);
        await registerUser({name: 'test', email: '', password: 'password'}).expect(400);
        await registerUser({name: 'test', email: 'test@gmail.com', password: ''}).expect(400);
    });
    
    it('disallows duplicate emails', async () => {
        await registerUser({name: 'test', email: 'test@gmail.com', password: 'password'}).expect(201);
        await registerUser({name: 'test', email: 'test@gmail.com', password: 'password'}).expect(400);
    });
});



