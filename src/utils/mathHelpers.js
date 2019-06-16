// file that contains basic math function helpers
// easier to test and reuse if in it's own JS file

function add(param1, param2) {
  return param1 + param2;
}

function subtract(param1, param2) {
  return param1 - param2;
}

function multiply(param1, param2) {
  return param1 * param2;
}

function divide(param1, param2) {
  return param1 / param2;
}

function percentage(param) {
  return param / 100;
}

// made this to make sure its converted per the calculators "spec" and reduces user error by providing the helper
function toNum(param) {
  return parseFloat(param);
}

// removes leading zeroes because thats not a thing in numbers
// this is necessary because I store numbers as string until they are ready for math
function removeLeadingZeroes(param) {
  return `${toNum(param)}`;
}

export { add, subtract, multiply, divide, percentage, toNum, removeLeadingZeroes };
