import { model, Schema, SchemaTypes, Document } from 'mongoose';
import { Models } from '../../constants';
import { IPortfolio } from './portfolio.types';

const portfolioSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: Models.User,
      required: true,
    },
    stocks: [
      {
        stockId: {
          type: SchemaTypes.ObjectId,
          ref: Models.Stock,
          required: true,
        },
        quantity: {
          type: SchemaTypes.Number,
          required: true,
        },
      },
    ],
    // can have more details
  },
  { timestamps: true },
);

type PortfolioType = Document & IPortfolio;
const PortfolioModel = model<PortfolioType>(Models.Portfolio, portfolioSchema);

export default PortfolioModel;
