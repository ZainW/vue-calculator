<template>
  <div id="app">
    <Calculator />
  </div>
</template>

<script>
import Calculator from './components/Calculator';

export default {
  name: 'App',
  components: {
    Calculator
  }
};
</script>

<style>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 1.5rem;
  background-color: #011627;
}
</style>
