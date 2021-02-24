import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';

const stateFixture = {
  newTask: 'eat the frog 20pts',
  tasks: [
    {name: 'kill bill', points: 6},
    {name: 'get shorty', points: 12},
  ],
};

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App
      initialState={stateFixture}
    />);
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the task names', () => {
    const text = wrapper.text();

    expect(text).toMatch(/kill bill/);
    expect(text).toMatch(/get shorty/);
  });

  it('sorts tasks by descending point value', () => {
    const text = wrapper.text();
  });

  it('renders the correct class for the point threshold', () => {
    const critical = wrapper.find('.critical').hostNodes();
    expect(critical.text()).toMatch(/get shorty/);

    const normal = wrapper.find('.normal').hostNodes();
    expect(normal.text()).toMatch(/kill bill/);
  });

  it('parses point input in the task name', () => {
    expect(wrapper.state().tasks.length).toEqual(2);
    wrapper.find('form#addtask').first().simulate('submit');
    expect(wrapper.state().tasks.length).toEqual(3);
    expect(wrapper.state().tasks[2].points).toEqual(20);
  });
});
