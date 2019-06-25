<template>
  <!-- could also make this a functional component but functional SFC's (will still exist in render funcitons) are are being removed in Vue 3 so let's call this Vue 3 ready -->
  <!-- would rather use some sort of css in js instead of the style bind and the way classes are done now, but that is overkill for this current easier to understand example -->
  <!-- could have put the value being emitted here on click, I don't really know if there is a difference design wise -->
  <!-- wanted to show off both class and style binding as they both can be sueful in scenarios, i understand people dont like inline styles but sometimes it's easier to use -->
  <button
    :class="classBind"
    :style="styleBind"
    :data-qa="`calculator-button__${value}`"
    v-on="$listeners"
  >
    {{ value }}
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },

    // for all the different colours
    buttonType: {
      type: String,
      default: 'default',
      validator: type => {
        return ['primary', 'secondary', 'default'].includes(type);
      }
    },

    // how many cells it should span, only going to be used for '0' in this example
    span: {
      type: Number,
      default: 1
    }
  },

  computed: {
    styleBind() {
      return {
        'grid-column-end': `span ${this.span}`
      };
    },

    classBind() {
      return {
        'calculator-button': true,
        'calculator-button__default': this.buttonType === 'default',
        'calculator-button__primary': this.buttonType === 'primary',
        'calculator-button__secondary': this.buttonType === 'secondary'
      };
    }
  }
};
</script>

<style lang="scss">
.calculator-button {
  color: white;
  background-color: $grey;

  // for some reason this is needed, in a real scenario I would figure out why it is not inheriting from app.vue
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;

  // not sure why my buttons look weird without the border, might have to do with the reset for buttons
  font-size: 2rem;

  // Im am debating default nested class, not totally sold on it but a lot of other stuff needs to change if I change it
  &__default {
    // adding the border as the same colour for sanity purposes
    border: 1px solid $grey;
  }
  &:hover {
    background-color: lighten($grey, 10%);
    border: 1px solid $grey;
  }

  &:active {
    box-shadow: inset 0px 0px 5px #c1c1c1;
  }

  &__primary {
    background-color: $orange;
    border: 1px solid $orange;

    &:hover {
      background-color: lighten($orange, 10%);
    }

    &:active {
      border-color: $orange;
    }
  }

  &__secondary {
    background-color: $grey-darker;
    border: 1px solid $grey-darker;

    &:hover {
      background-color: lighten($grey-darker, 10%);
    }
  }
}
</style>
