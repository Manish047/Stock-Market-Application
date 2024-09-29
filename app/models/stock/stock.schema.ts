import { model, Schema, SchemaTypes, Document } from 'mongoose';
import { IStock } from './stock.types';
import { Models } from '../../constants';

const stockSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    price: {
      type: SchemaTypes.Number,
      required: true,
    },
    // can have more details
  },
  { timestamps: true },
);

type StockDocument = Document & IStock;
const StockModel = model<StockDocument>(Models.Stock, stockSchema);

export default StockModel;
