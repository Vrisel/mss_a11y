import { createLocalVue, mount } from '@vue/test-utils';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import stubGoodsList from './stub.goodslist.js';
import CategoryItem from '~/components/CategoryItem.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

describe('CategoryItem', () => {
  test('presents props properly', () => {
    const wrapper = mount(CategoryItem, {
      localVue,
      propsData: stubGoodsList['001001'][0],
    });

    expect(wrapper.vm.sale).toBe(0);
    expect(
      wrapper
        .find('.price')
        .text()
        .match(/[\d,]+원/)[0]
    ).toBe('13,900원');
  });
});
