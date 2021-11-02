import { createLocalVue, mount } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import stubCategory from './stub.category.js';
import Accordion from '@/components/layouts/TheAsideAccordion.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Accordion', () => {
  test('presents props properly', () => {
    const wrapper = mount(Accordion, {
      localVue,
      propsData: stubCategory['001'],
    });

    expect(wrapper.vm.isBest).toBe(false);

    const strong = wrapper.find('strong');
    expect(strong.text()).toBe('상의');

    const sup = wrapper.find('sup');
    expect(sup.text()).toBe('Top');

    expect(wrapper.vm.total).toBe(39377 + 9246);

    expect(wrapper.find('.count').text().includes(',')).toBe(true);
  });
});
