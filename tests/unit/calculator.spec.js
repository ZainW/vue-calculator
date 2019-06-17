import { shallowMount } from '@vue/test-utils';
import Calculator from '@/components/Calculator.vue';
describe('HelloWorld.vue', () => {
  it('mounts successfully ', () => {
    const wrapper = shallowMount(Calculator);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('calculates properly', () => {
    const wrapper = shallowMount(Calculator);

    // expression is the key, where each char is a character pertaining
    // I find this easier to write/understand as opposed to just writing the array of arrays that object.entries provides
    const evalStrings = { '3X3-7=': '2', '3X3-10=': '-1', '3X3-10+2=': '1' };

    // easier to iterate over array over pairs
    const evalIterator = Object.entries(evalStrings);

    // for each pair, trigger the proper buttons and assert it to the appropriate output
    for (let pairs of evalIterator) {
      wrapper.find('[data-qa="calculator-button__AC"]').trigger('click');
      for (let char of pairs[0]) {
        wrapper.find(`[data-qa="calculator-button__${char}"]`).trigger('click');
      }

      expect(wrapper.vm.currentValue).toBe(pairs[1]);
    }
  });
});
