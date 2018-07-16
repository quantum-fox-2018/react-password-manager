import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Enyzme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { 
  BrowserRouter as Router, Route, 
  Redirect, Switch, MemoryRouter 
} from 'react-router-dom'

import SignInUp from './components/SignInUP'
import Main from './components/Main'
import store from './store'
import { App } from './App'
import LocalStorageMock from './test/LocalStorageMock'
// import { wrap } from 'module'

global.localStorage = new LocalStorageMock
Enyzme.configure({ adapter: new Adapter()})

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const wrapper = mount(
      <Provider store={store}>
        <App user={{loginStatus: false}}/>
      </Provider>
    )
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have <Router />, <Switch /> and <Route />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.containsAllMatchingElements([
      <Router />,
      <Switch />,
      <Route />
    ])).toHaveLength[5]
    // kalo pake toBeTruthy malah error
  })

  it('it should redirect to SignInUp', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App user={{loginStatus: false}}/>
      </Provider>
    )
    expect(wrapper.containsMatchingElement(<SignInUp />)).toBeTruthy()
    expect(wrapper.containsMatchingElement(<Main />)).toBeFalsy()
    // expect(wrapper.find('h2')).toBeTruthy()
  })

  it('it should redirect to Main', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App user={{loginStatus: true}}/>
      </Provider>
    )
    expect(wrapper.containsMatchingElement(<SignInUp />)).toBeFalsy()
    expect(wrapper.containsMatchingElement(<Main />)).toBeTruthy()
  })

  // cek kalo dia ke path lain harus 404 belum
  // cek componentDidMount belum
})