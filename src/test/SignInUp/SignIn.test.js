import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Enyzme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { 
  BrowserRouter as Router, Route
} from 'react-router-dom'
import { wrap } from 'module'

import { SignIn } from '../../components/SignInUp/SignIn'
import { SignIn as signInAction } from '../../store/user/user.action'
import { SIGN_IN } from '../../store/user/user.action.type'
import store from '../../store'

Enyzme.configure({ adapter: new Adapter()})

describe('<SignIn />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const wrapper = shallow(<SignIn />)
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have email and password state with empty string', () => {
    const wrapper = shallow(<SignIn />)
    expect(wrapper.state('email')).toBe('')
    expect(wrapper.state('password')).toBe('')
  })

  it('onChange, email state should change', () => {
    const wrapper = shallow(<SignIn />)
    wrapper.find('#email').simulate('change', 
    {target: {name: 'email', value:'danny'}})
    expect(wrapper.state('email')).toBe('danny')
  })

  it('onChange, password state should change', () => {
    const wrapper = shallow(<SignIn />)
    wrapper.find('#password').simulate('change', 
    {target: {name: 'password', value:'pass123'}})
    expect(wrapper.state('password')).toBe('pass123')
  })

  // masih salah
  it.skip('should run dispatch signInAction', () => {
    const payload = {
      email: 'test@gmail.com',
      password: '123123'
    }
    const expectedAction = {
      type: SIGN_IN,
      payload
    }
    expect(signInAction(payload)).toEqual(expectedAction)
  })

  // niatnya
  // cek kalo button signIn di click "userSignIn" method ke panggil
})