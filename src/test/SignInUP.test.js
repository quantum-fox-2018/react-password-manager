import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Enyzme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { 
  BrowserRouter as Router, Route
} from 'react-router-dom'
import { wrap } from 'module'

import SignInUp from '../components/SignInUP'
import Nav from '../components/Nav'
import SignIn from '../components/SignInUp/SignIn'
import SignUp from '../components/SignInUp/SignUp'
import store from '../store'

Enyzme.configure({ adapter: new Adapter()})

describe('<SignInUP />', () => {
  it('should renders without crashing', () => {
    const div = document.createElement('div')
    const wrapper = mount(
      <Provider store={store}>
        <SignInUp />
      </Provider>
    )
    // console.log(get())
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)  
  })

  it('should have Components <Nav />, <SignIn /> and <SignUp />', () => {
    const wrapper = shallow(<SignInUp />)
    expect(wrapper.containsAllMatchingElements([
      <Nav />,
      <SignIn />,
      <SignUp />
    ])).toBeTruthy()
  })
})