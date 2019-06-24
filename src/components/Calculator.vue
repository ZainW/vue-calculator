<template>
  <div id="calculator-container">
    <div id="calculator-value-display">{{ currentValue || '0' }}</div>
    <CalculatorButton
      v-for="{ value, type, span } in buttonValues"
      :key="value"
      :button-type="type"
      :value="value"
      :span="span || 1"
      @click="buttonClick(value)"
    />
  </div>
</template>

<script>
import { toNum, percentage, removeLeadingZeroes } from '@/utils/mathHelpers';

import { buttonValues, operations } from '@/utils/calculatorHelpers';

import CalculatorButton from './CalculatorButton';

export default {
  name: 'Calculator',

  components: {
    CalculatorButton
  },

  data() {
    return {
      currentValue: '',
      previousValue: null,
      operation: null,
      buttonValues
    };
  },

  methods: {
    // replaced switch statments with object mapping
    buttonClick(value) {
      // I would merge the maps together if I could call preOperations

      // mapped non-'operations' based buttons
      const mappedSpecials = {
        AC: this.clear,
        '%': this.percentage,
        '+/-': this.inverse,
        '=': this.evaluate,
        '.': this.addDecimal
      };

      // checks if the value is in operations, defined in utils
      // then checks if value is in mappedSpecials and executes
      // then defaults out to number based logic and executes
      if (Object.keys(operations).filter(key => key == value).length > 0) {
        this.operationSet(value);
        this.operation = operations[value];
      } else if (Object.keys(mappedSpecials).filter(key => key == value).length > 0) {
        mappedSpecials[value](value);
      } else {
        this.buttonNum(value);
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

    operationSet(operation) {
      if (this.previousValue && this.operation) {
        this.silentEvaluate();
      } else {
        this.previousValue = this.currentValue;
      }
      this.currentValue = '';
      this.operation = operations[operation];
    },

    buttonNum(value) {
      this.currentValue += value;
      this.currentValue = removeLeadingZeroes(this.currentValue);
    },

    percentage() {
      // checks for starting null state so that the calculations moving forward don't mess up
      if (this.currentValue) {
        this.currentValue = percentage(toNum(this.currentValue));
      }
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

// Use of rems can be ideal, see how easy the buttons and display scale by zooming in and out in your browser

/* seemed like a good candidate for CSS grid treat the buttons and the display as a 4x6 grid, where display would span the first row and the 0 button would span 2 */
#calculator-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 0.125rem;
  border: 0.2rem solid black;
  border-radius: 0.2rem;
  background-color: black;
  font-size: 4rem;
  grid-template-rows: auto;
}

#calculator-value-display {
  grid-column-end: span 4;
  border: 1px solid;
  text-align: right;
  padding: 0.1rem 0.1em;
  border: 1px solid darken($background, 15%);
  background-color: $background;
  color: white;
}
</style>
