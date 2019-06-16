<template>
  <div id="calculator-container">
    <div id="calculator-value-display">{{ currentValue || '0' }}</div>
    <button data-qa="calculator-button__AC" class="calculator-button" @click="clear">AC</button>
    <button data-qa="calculator-button__+-" class="calculator-button" @click="inverse('+/-')">
      +/-
    </button>
    <button data-qa="calculator-button__%" class="calculator-button" @click="percentage">%</button>
    <button data-qa="calculator-button__/" class="calculator-button" @click="setOperation('/')">
      /
    </button>
    <button data-qa="calculator-button__7" class="calculator-button" @click="buttonClick('7')">
      7
    </button>
    <button data-qa="calculator-button__8" class="calculator-button" @click="buttonClick('8')">
      8
    </button>
    <button data-qa="calculator-button__9" class="calculator-button" @click="buttonClick('9')">
      9
    </button>
    <button data-qa="calculator-button__X" class="calculator-button" @click="setOperation('X')">
      X
    </button>
    <button data-qa="calculator-button__4" class="calculator-button" @click="buttonClick('4')">
      4
    </button>
    <button data-qa="calculator-button__5" class="calculator-button" @click="buttonClick('5')">
      5
    </button>
    <button data-qa="calculator-button__6" class="calculator-button" @click="buttonClick('6')">
      6
    </button>
    <button data-qa="calculator-button__-" class="calculator-button" @click="setOperation('-')">
      -
    </button>
    <button data-qa="calculator-button__1" class="calculator-button" @click="buttonClick('1')">
      1
    </button>
    <button data-qa="calculator-button__2" class="calculator-button" @click="buttonClick('2')">
      2
    </button>
    <button data-qa="calculator-button__3" class="calculator-button" @click="buttonClick('3')">
      3
    </button>
    <button data-qa="calculator-button__+" class="calculator-button" @click="setOperation('+')">
      +
    </button>
    <button
      id="button-zero"
      data-qa="calculator-button__0"
      class="calculator-button"
      @click="buttonClick('0')"
    >
      0
    </button>
    <button data-qa="calculator-button__." class="calculator-button" @click="addDecimal">.</button>
    <button data-qa="calculator-button__=" class="calculator-button" @click="evaluate">=</button>
  </div>
</template>

<script>
import {
  add,
  subtract,
  divide,
  multiply,
  toNum,
  percentage,
  removeLeadingZeroes
} from '../utils/mathHelpers';
export default {
  name: 'Calculator',
  data() {
    return {
      currentValue: '',
      previousValue: null,
      operation: null
    };
  },

  methods: {
    // operation functions
    // this sets this.operation to whatever function should be ran on evaluate
    setOperation(operator) {
      // if the previous value exists then silently evaluate so that it can be chained with new commands

      if (this.previousValue && this.operation) {
        this.silentEvaluate();
      } else {
        this.previousValue = this.currentValue;
      }
      this.currentValue = '';
      switch (operator) {
        case '+':
          this.operation = add;
          break;
        case '-':
          this.operation = subtract;
          break;
        case '/':
          this.operation = divide;
          break;
        case 'X':
          this.operation = multiply;
          break;
        default:
          console.error('Operator called on something that is not supported');
          break;
      }
    },

    // evaluate the last expression on `=` click
    evaluate() {
      if (this.operation) {
        this.currentValue = `${this.operation(
          toNum(this.previousValue),
          toNum(this.currentValue)
        )}`;
        this.previousValue = null;
        this.operation = null;
      }
    },

    // silent evaluate, used when hitting operators off each
    silentEvaluate() {
      this.previousValue = `${this.operation(toNum(this.previousValue), toNum(this.currentValue))}`;
    },

    clear() {
      // clear all the data properties
      this.previousValue = null;
      this.operation = null;
      this.currentValue = '';
      this.lastClickOperator = false;
    },

    percentage() {
      // checks for starting null state so that the calculations moving forward don't mess up
      if (this.currentValue) {
        this.currentValue = percentage(toNum(this.currentValue));
      }
    },

    buttonClick(buttonValue) {
      this.currentValue += buttonValue;
      this.currentValue = removeLeadingZeroes(this.currentValue);
    },

    // +/- button "calculation"
    // I am aware that inverse actually means something else in math terms but I can't for the life of me remember what it is called
    inverse() {
      this.currentValue =
        this.currentValue.charAt(0) === '-' ? this.currentValue.slice(1) : `-${this.currentValue}`;
    },

    addDecimal() {
      // can not have multiple
      if (!this.currentValue.includes('.')) {
        this.currentValue += '.';
      }
    }
  }
};
</script>

<style lang="scss">
// personally like using sass for these style of variables and lighten/darken
// should probably learn css variables
$night-primary: #5d4092;
$night-primary-dark: #412d66;
$night-primary-hover: #9e8cbe;
$night-background: #011627;
/* seemed like a good candidate for CSS grid treat the buttons and the display as a 4x6 grid, where display would span the first row and the 0 button would span 2 */
#calculator-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 0.25em;
  border: 2px solid lighten($night-background, 15%);
  border-radius: 8px;
  padding: 0.25em;
  background-color: #011627;
}

#calculator-value-display {
  grid-column-end: span 4;
  border: 1px solid;
  text-align: right;
  padding: 0.5em 1em;
  border: 1px solid darken($night-background, 20%);
  border-radius: 12px;
  background-color: $night-primary;
  color: white;
}

#button-zero {
  grid-column-end: span 2;
  border-radius: 12px;
}

.calculator-button {
  border-radius: 50%;
  color: white;
  background-color: $night-primary;
  border: 2px solid $night-primary-dark;

  &:hover {
    background-color: $night-primary-hover;
    border: 2px solid $night-primary;
  }

  &:active {
    box-shadow: inset 0px 0px 5px #c1c1c1;
  }
}
</style>
