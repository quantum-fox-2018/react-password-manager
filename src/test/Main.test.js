import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Enyzme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { 
  BrowserRouter as Router, Route
} from 'react-router-dom'
import { wrap } from 'module'

import Main from '../components/Main'
import Nav from '../components/Nav'
import AddPassword from '../components/Main/AddPassword'
import PasswordList from '../components/Main/PasswordList'
import store from '../store'

Enyzme.configure({ adapter: new Adapter()})

describe('<Main />', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <Main />
      </Provider>
    )
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have tag input with id (SUemail, SUpassword, SUconPassword) and button Register', () => {
    expect(wrapper.containsAllMatchingElements([
      <Nav />,
      <AddPassword />,
      <PasswordList />,
      <button>Logout</button>
    ])).toBeTruthy()
  })
})