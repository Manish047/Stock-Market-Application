import { body, param } from 'express-validator';
import { validate } from '../../middleware/validator';

export const createStockValidator = [
  body('name').isString().withMessage('Please enter valid name!'),
  body('price')
    .isNumeric()
    .withMessage('Please enter correct price!')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Price must be greater than 0!');
      }
      return true;
    }),
  validate,
];

export const updateStockValidator = [
  param('stockId').isString().withMessage('Please provide stockId!'),
  ...createStockValidator,
];
