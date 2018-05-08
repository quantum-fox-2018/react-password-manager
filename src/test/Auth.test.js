import React from 'react'
import ReactDOM from 'react-dom'
import Enyzme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

Enyzme.configure({ adapter: new Adapter() })

describe('<SignIn />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const wrapper = shallow(<SignIn />)
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    const wrapper = shallow(<SignUp />)
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have <Router />, <Switch /> and <Route />', () => {
    const wrapper = shallow(<SignIn />)
    expect(wrapper.containsAllMatchingElements([
      <Router />,
      <Switch />,
      <Route />
    ]))
  })

  it('should have <Router />, <Switch /> and <Route />', () => {
    const wrapper = shallow(<SignUp />)
    expect(wrapper.containsAllMatchingElements([
      <Router />,
      <Link />,
      <Switch />,
      <Route />
    ]))
  })

  it('should have email and password state with empty string', () => {
    const wrapper = shallow(<SignIn />)
    expect(wrapper.state('email')).toBe('')
    expect(wrapper.state('password')).toBe('')
  })

  it('should have email and password state with empty string', () => {
    const wrapper = shallow(<SignUp />)
    expect(wrapper.state('email')).toBe('')
    expect(wrapper.state('password')).toBe('')
  })

  it('onChange, email state should change', () => {
    const wrapper = shallow(<SignIn />)
    wrapper.find('#login').simulate('change', 
    {target: {name: 'email', value:'wika'}})
    expect(wrapper.state('email')).toBe('wika')
  })

  it('onChange, password state should change', () => {
    const wrapper = shallow(<SignIn />)
    wrapper.find('#password').simulate('change', 
    {target: {name: 'password', value:'pass123'}})
    expect(wrapper.state('password')).toBe('pass123')
  })

  it('onChange, email state should change', () => {
    const wrapper = shallow(<SignUp />)
    wrapper.find('#login').simulate('change', 
    {target: {name: 'email', value:'wika'}})
    expect(wrapper.state('email')).toBe('wika')
  })

  it('onChange, password state should change', () => {
    const wrapper = shallow(<SignUp />)
    wrapper.find('#password').simulate('change', 
    {target: {name: 'password', value:'pass123'}})
    expect(wrapper.state('password')).toBe('pass123')
  })

})

