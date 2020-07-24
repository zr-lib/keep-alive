import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import KeepAlive from '../src/index';
import configKeepAliveTest from './configKeepAliveTest';
import useKeepAliveCacheTest from './useKeepAliveCacheTest';

configure({ adapter: new Adapter() });

const Child = (props) => <div className="child">ccccaaaa</div>;

describe('[=== keep-alive test ===]', () => {
  configKeepAliveTest({
    store: global,
    maxLength: 2,
    useStorage: 'sessionStorage',
  });
  useKeepAliveCacheTest('child');

  const wrapper1 = shallow(
    <KeepAlive name="child">{(props) => <Child {...props} />}</KeepAlive>
  );
  const wrapper2 = shallow(
    <KeepAlive name="child">
      <Child />
    </KeepAlive>
  );

  it('--- children 非函数不渲染 ---', () => {
    expect(typeof wrapper2.children() === 'function').toBe(false);
    expect(wrapper2.html()).toBe(null);
  });

  // 第一次
  it('--- 成功渲染 ---', () => renderSuccess(wrapper1));
  it('--- 成功附加属性 KeepAliveAssist 到子组件 children ---', () =>
    addPropsSuccess(wrapper1));
  it('--- 子组件, 附加属性 KeepAliveAssist 返回有效值 ---', () => propsValid());

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

    const { name, scrollTop, state } = getKeepAlive();
    expect(name).toBe('child');
    expect(scrollTop).toBe(10);
    expect(state).toEqual(['1', '2']);

    // 第二次
    beforeRouteLeave(100, ['11', '22']);
    expect(scrollRestore()).toBe(100);
    expect(stateRestore()).toEqual(['11', '22']);

    const {
      name: name2,
      scrollTop: scrollTop2,
      state: state2,
    } = getKeepAlive();
    expect(name2).toBe('child');
    expect(scrollTop2).toBe(100);
    expect(state2).toEqual(['11', '22']);

    deleteCache();
    expect(getKeepAlive()).toBe(null);
  };
});
