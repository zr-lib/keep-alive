import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import KeepAlive from './index';

configure({ adapter: new Adapter() });

const Child = (props) => <div className="child">ccccaaaa</div>;

describe('============= keep-alive test =============', () => {
  const wrapper1 = shallow(
    <KeepAlive name="child">{(props) => <Child {...props} />}</KeepAlive>
  );
  const wrapper2 = shallow(
    <KeepAlive name="child">
      <Child />
    </KeepAlive>
  );

  it('-- children 非函数不渲染 --', () => {
    expect(typeof wrapper2.children() === 'function').toBe(false);
    expect(wrapper2.html()).toBe(null);
  });

  // 第一次
  it('-- 成功渲染 --', () => renderSuccess(wrapper1));
  it('-- 成功附加属性 KeepAliveAssist 到子组件 children --', () =>
    addPropsSuccess(wrapper1));
  it('-- 子组件, 附加属性 KeepAliveAssist 返回有效值 --', () => propsValid());

  // 成功渲染
  const renderSuccess = (_wrapper) =>
    expect(_wrapper.render().text() === 'ccccaaaa').toBeTruthy();

  // 成功附加属性
  const addPropsSuccess = (_wrapper) => {
    const assistProps = [
      'beforeRouteLeave',
      'scrollRestore',
      'stateRestore',
      'deleteCache',
      'getKeepAlive',
    ];
    const props = _wrapper.props();
    const keys = Object.keys(props);
    const has = assistProps.every((key) => keys.includes(key));

    expect(has).toBeTruthy();
  };

  let count = 0;
  // 附加属性 KeepAliveAssist 返回有效值
  const propsValid = () => {
    if (count > 1) return;
    count++;

    const {
      beforeRouteLeave,
      scrollRestore,
      stateRestore,
      deleteCache,
      getKeepAlive,
    } = wrapper1.props();

    beforeRouteLeave(10, ['1', '2']);
    expect(scrollRestore()).toBe(10);
    expect(stateRestore()).toEqual(['1', '2']);

    const { name, scrollTop, state, cache } = getKeepAlive();
    expect(name).toBe('child');
    expect(scrollTop).toBe(10);
    expect(state).toEqual(['1', '2']);
    const _wrapper = shallow(<KeepAlive name="child">{cache()}</KeepAlive>);

    // 第二次
    renderSuccess(_wrapper);
    addPropsSuccess(_wrapper);
    propsValid(_wrapper);

    deleteCache();
    expect(getKeepAlive()).toBe(null);
  };
});
