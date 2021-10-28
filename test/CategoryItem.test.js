import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CategoryItem from '@/components/CategoryItem.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CategoryItem', () => {
  test('presents props properly', () => {
    const wrapper = mount(CategoryItem, {
      localVue,
      propsData: {
        brand: { name: '무신사 스탠다드', to: 'musinsastandard' },
        goods: {
          name: '레이어드 크루 넥 반팔 티셔츠_긴 기장 [화이트]',
          to: '1382658',
        },
        price: 13900,
        badge: { text: '무신사 단독', variant: 'success' },
      },
    });

    expect(wrapper.vm.sale).toBe(0);
    expect(wrapper.vm.computedPrice).toBe('13,900원');
  });
});
