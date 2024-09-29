import { model, Schema, SchemaTypes, Document } from 'mongoose';
import { Models } from '../../constants';
import { ITrade, TradeStatus, TradeType } from './trade.types';

const tradeSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: Models.User,
      required: true,
    },
    portfolioId: {
      type: SchemaTypes.ObjectId,
      ref: Models.Portfolio,
      required: true,
    },
    stockId: {
      type: SchemaTypes.ObjectId,
      ref: Models.Stock,
      required: true,
    },
    quantity: {
      type: SchemaTypes.Number,
      required: true,
    },
    price: {
      type: SchemaTypes.Number,
      required: true,
    },
    type: {
      type: SchemaTypes.String,
      required: true,
      enum: Object.keys(TradeType),
    },
    status: {
      type: SchemaTypes.String,
      required: true,
      enum: Object.keys(TradeStatus),
    },
    executedBy: {
      type: SchemaTypes.ObjectId,
      ref: Models.User,
    },
    // can have more details
  },
  { timestamps: true },
);

type TradeDocument = Document & ITrade;
const TradeModel = model<TradeDocument>(Models.Trade, tradeSchema);

export default TradeModel;
