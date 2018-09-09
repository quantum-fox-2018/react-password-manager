import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import store from '../store'
import LocalStorageMock from './localstorageMock'
import Login from '../components/Login'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';

global.localStorage = new LocalStorageMock();
Enzyme.configure({ adapter: new Adapter() });

describe('<Login/>', () => {
  it('it should have username and password start with empty list', () => {
    const wrapper = mount(shallow(<Login store={store}/>).get(0))
    expect(wrapper.state('username')).toBe('')
    expect(wrapper.state('password')).toBe('')
  })
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = mount(
      <Provider store={store}>
    <Login/>
    </Provider>
    )
    ReactDOM.render(wrapper, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('it should have form tag ', () => {
    const wrapper = shallow(<Login store={store}/>)
    expect(wrapper.find('form'))
    expect(wrapper.exists('<input type="text">')).toBe(true)
    expect(wrapper.exists('<input type="password">')).toBe(true)
  })
  
  it('onChange, username state should change', () => {
    const wrapper = mount(shallow(<Login store={store}/>).get(0))
    // console.log('=================logiin======', wrapper.state())
    wrapper.find('#username').simulate('change',
    {target: {name:'username', value: 'testing'}})
    expect(wrapper.state('username')).toBe('testing')
  })

})