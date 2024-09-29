import { connect, Mongoose } from 'mongoose';

export class MongoConnection {
  private static connection: Mongoose;

  public static createConnection = async () => {
    this.connection = await connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`);
  };

  public static getConnection = () => {
    return this.connection;
  };
}
