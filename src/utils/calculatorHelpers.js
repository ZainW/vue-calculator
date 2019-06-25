import { add, subtract, multiply, divide } from './mathHelpers';

// used to house the buttons that should be rendered with it's buttonType prop
export const buttonValues = [
  { value: 'AC', type: 'secondary' },
  { value: '+/-', type: 'secondary' },
  { value: '%', type: 'secondary' },
  { value: '/', type: 'primary' },
  { value: '7', type: 'default' },
  { value: '8', type: 'default' },
  { value: '9', type: 'default' },
  { value: 'X', type: 'primary' },
  { value: '4', type: 'default' },
  { value: '5', type: 'default' },
  { value: '6', type: 'default' },
  { value: '-', type: 'primary' },
  { value: '1', type: 'default' },
  { value: '2', type: 'default' },
  { value: '3', type: 'default' },
  { value: '+', type: 'primary' },
  { value: '0', type: 'default', span: 2 },
  { value: '.', type: 'default' },
  { value: '=', type: 'primary' }
];

// eslint/prettier formats the X without a string, I won't fight it for continuity
// bind the operations to an easy to use Object
export const operations = {
  '+': add,
  '-': subtract,
  X: multiply,
  '/': divide
};
