import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { secretKey } from "./conf";

declare global {
    var signin: () => string;
  }

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = secretKey;

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();

      for (let collection of collections) {
          await collection.deleteMany({});
      }
  }
});

afterAll(async () => {
  if (mongo) {
      await mongo.stop();
  }

  await mongoose.connection.close();
});

global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const token = jwt.sign(
    {
      id,
      email: 'test@test.com',  
    },
    process.env.JWT_KEY!
  );

  return `Bearer ${token}`;
};
