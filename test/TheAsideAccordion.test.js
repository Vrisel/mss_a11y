import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Accordion from '@/components/layouts/TheAsideAccordion.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Accordion', () => {
  test('presents props properly', () => {
    const wrapper = mount(Accordion, {
      localVue,
      propsData: {
        title: '인기',
        english: 'Best',
        items: [
          { name: '후드 집업', category: '002022', count: 2567 },
          { name: '데님 팬츠', category: '003002', count: 6217 },
          { name: '캔버스/단화', category: '018002', count: 4587 },
        ],
      },
    });

    expect(wrapper.vm.isBest).toBe(true);

    const strong = wrapper.find('strong');
    expect(strong.text()).toBe('인기');

    const sup = wrapper.find('sup');
    expect(sup.text()).toBe('Best');

    // =0 because of 'Best' (otherwise 2567 + 6217 = 8784)
    expect(wrapper.vm.total).toBe(0);

    expect(wrapper.find('.count').text().includes(',')).toBe(true);
  });
});
