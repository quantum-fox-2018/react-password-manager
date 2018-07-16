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
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<SignUp />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have tag input with id (SUemail, SUpassword, SUconPassword) and button Register', () => {
    expect(wrapper.containsAllMatchingElements([
      <input id="SUemail" />,
      <input id="SUpassword" />,
      <input id="SUconPassword" />,
      <button>Register</button>
    ])).toBeTruthy()
  })

  it('should have email, password and conPass state with empty string', () => {
    expect(wrapper.state('SUemail')).toBe('')
    expect(wrapper.state('SUpassword')).toBe('')
    expect(wrapper.state('SUconPassword')).toBe('')
  })

  it('onChange, SignUp email state should have changed', () => {
    wrapper.find('#SUemail').simulate('change', 
    {target: {name: 'SUemail', value:'test123@gmail.com'}})
    expect(wrapper.state('SUemail')).toBe('test123@gmail.com')
  })

  it('onChange, SignUp password state have changed', () => {
    wrapper.find('#SUpassword').simulate('change', 
    {target: {name: 'SUpassword', value:'pass123'}})
    expect(wrapper.state('SUpassword')).toBe('pass123')
  })

  it('onChange, SignUp Confirm password state have changed', () => {
    wrapper.find('#SUconPassword').simulate('change', 
    {target: {name: 'SUconPassword', value:'pass123'}})
    expect(wrapper.state('SUconPassword')).toBe('pass123')
  })

//   it('submit Register', () => {
    
//   })
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
  // cek kalo button Register di click "userRegister" method ke panggil
  // cek juga kalo password dan password sama, baru bisa jalanin Register()
})