import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import store from '../store'
import LocalStorageMock from './localstorageMock'
import {Login} from '../components/Login'
import {Provider} from 'react-redux'

global.localStorage = new LocalStorageMock();
Enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
  it('it should have username and password start with empty list', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.state('username')).toBe('')
    expect(wrapper.state('password')).toBe('')
  })

  it('it should have form tag ', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('form'))
  })
})