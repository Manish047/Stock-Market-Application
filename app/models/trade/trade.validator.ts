import { body, param } from 'express-validator';
import { validate } from '../../middleware/validator';
import { TradeType } from './trade.types';

export const addTradeValidator = [
  body('stockId').isString().withMessage('stockId is required!'),
  body('portfolioId').isString().withMessage('portfolioId is required!'),
  body('quantity')
    .isNumeric()
    .withMessage('quantity is required!')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Quantity must be greater than 0!');
      }
      return true;
    }),
  body('price')
    .isNumeric()
    .withMessage('price must be a valid number!')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Price must be greater than 0!');
      }
      return true;
    }),
  body('type').custom((value) => {
    if (!Object.keys(TradeType).includes(value)) {
      throw new Error(`type must be one of - ${Object.keys(TradeType).join(', ')}`);
    }
    return true;
  }),
  validate,
];

export const updateTradeValidator = [
  param('tradeId').isString().withMessage('tradeId is required!'),
  body('quantity')
    .isNumeric()
    .withMessage('quantity is required!')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Quantity must be greater than 0!');
      }
      return true;
    }),
  body('price')
    .isNumeric()
    .withMessage('price must be a valid number!')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Price must be greater than 0!');
      }
      return true;
    }),
  validate,
];

export const deleteTradeValidator = [param('tradeId').isString().withMessage('tradeId is required!'), validate];

export const executeTradeValidator = [param('tradeId').isString().withMessage('tradeId is required!'), validate];
