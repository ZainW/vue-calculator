// file that contains basic math function helpers
// easier to test and reuse if in it's own JS file

function add(param1, param2) {
  return param1 + param2;
}

function subtract(param1, param2) {
  return param1 - param2;
}

// add the toFixed due to how js handles decimals which you can read more about it here https://javascript.info/number#imprecise-calculations
// chose 8 as a number just because
// use toNum to remove trailing zeroes from toFixed
function multiply(param1, param2) {
  return toNum((param1 * param2).toFixed(8));
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
