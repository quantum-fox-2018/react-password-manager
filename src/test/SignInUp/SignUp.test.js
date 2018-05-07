import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Enyzme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { 
  BrowserRouter as Router, Route
} from 'react-router-dom'
import { wrap } from 'module'

import { SignUp } from '../../components/SignInUp/SignUp'
import { Register } from '../../store/user/user.action'
import { REGISTER  } from '../../store/user/user.action.type'
import store from '../../store'

Enyzme.configure({ adapter: new Adapter()})

describe('<SignUp />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const wrapper = shallow(<SignUp />)
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have email, password and conPass state with empty string', () => {
    const wrapper = shallow(<SignUp />)
    expect(wrapper.state('SUemail')).toBe('')
    expect(wrapper.state('SUpassword')).toBe('')
    expect(wrapper.state('SUconPassword')).toBe('')
  })

  it('onChange, SignUp email state should change', () => {
    const wrapper = shallow(<SignUp />)
    wrapper.find('#SUemail').simulate('change', 
    {target: {name: 'SUemail', value:'test123@gmail.com'}})
    expect(wrapper.state('SUemail')).toBe('test123@gmail.com')
  })

  it('onChange, SignUp password state should change', () => {
    const wrapper = shallow(<SignUp />)
    wrapper.find('#SUpassword').simulate('change', 
    {target: {name: 'SUpassword', value:'pass123'}})
    expect(wrapper.state('SUpassword')).toBe('pass123')
  })

  it('onChange, SignUp Confirm password state should change', () => {
    const wrapper = shallow(<SignUp />)
    wrapper.find('#SUconPassword').simulate('change', 
    {target: {name: 'SUconPassword', value:'pass123'}})
    expect(wrapper.state('SUconPassword')).toBe('pass123')
  })

//   // masih salah
//   it.skip('should run dispatch signInAction', () => {
//     const payload = {
//       email: 'test@gmail.com',
//       password: '123123'
//     }
//     const expectedAction = {
//       type: SIGN_IN,
//       payload
//     }
//     expect(signInAction(payload)).toEqual(expectedAction)
//   })

  // niatnya
  // cek kalo button signIn di click "userSignIn" method ke panggil
})