import { config } from 'dotenv';
config();

import { MongoConnection } from './connections/mongo';
import { UserRoles } from './constants/user-roles';

import UserRoleModel from './models/user-role/user-role.schema';
import StockModel from './models/stock/stock.schema';
import UserModel from './models/user/user.schema';
import { encodePassword } from './utils/password';
import PortfolioModel from './models/portfolio/portfolio.schema';

(async () => {
  // Acquire connection
  await MongoConnection.createConnection();

  // Insert User Roles
  await UserRoleModel.insertMany(Object.keys(UserRoles).map((role) => ({ title: role })) as any);

  // Insert Stocks
  await StockModel.insertMany([
    { name: 'TATA MOTORS', price: 900 },
    { name: 'RELIANCE', price: 2500 },
    { name: 'HDFC BANK', price: 1500 },
  ]);

  // Insert Broker
  const brokerRole = await UserRoleModel.findOne({ title: 'BROKER' });
  await new UserModel({
    name: 'Broker',
    email: 'broker@app.com',
    password: await encodePassword('broker@123'),
    role: brokerRole?._id,
  }).save();

  // Insert Investor
  const investorRole = await UserRoleModel.findOne({ title: 'INVESTOR' });
  const user = await new UserModel({
    name: 'Investor',
    email: 'investor@app.com',
    password: await encodePassword('investor@123'),
    role: investorRole?._id,
  }).save();

  // Create a portfolio for the investor
  await new PortfolioModel({ userId: user._id, stocks: [] }).save();
  console.info('App setup complete!');
})();
