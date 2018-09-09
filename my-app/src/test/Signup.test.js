import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import store from '../store'
import LocalStorageMock from './localstorageMock'
import Signup from '../components/Signup'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'

global.localStorage = new LocalStorageMock();
Enzyme.configure({ adapter: new Adapter() });

describe('<Signup/>', () => {
  it('it should have username and password start with empty list', () => {
    const wrapper = shallow(<Signup/>)
    expect(wrapper.state('username')).toBe('')
    expect(wrapper.state('password')).toBe('')
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = shallow(
    <Signup/>
    )
    ReactDOM.render(wrapper, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('it should have form tag ', () => {
    const wrapper = shallow(<Signup/>)
    expect(wrapper.find('form'))
    expect(wrapper.exists('<input type="text">')).toBe(true)
    expect(wrapper.exists('<input type="password">')).toBe(true)
  })

  it('onChange, username state should change', () => {
    const wrapper = shallow(<Signup/>)
    wrapper.find('#username').simulate('change', 
    {target: {name: 'username', value:'testing'}})
    expect(wrapper.state('username')).toBe('testing')
  })
  it('renders without crashing snapshot', () => {
      const rendered = renderer.create(<Signup/>)
      expect(rendered).toMatchSnapshot()
    });
})