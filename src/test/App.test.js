import React from 'react';
import ReactDOM from 'react-dom';
import Enyzme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import auth from '../../src/store/auth'
import Auth from '../pages/Auth'
import Home from '../pages/Home'
import AddData from '../pages/AddData'
import Footer from '../components/Footer'
import App from '../App';

Enyzme.configure({ adapter: new Adapter() })

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have <Router />, <Switch /> and <Route />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.containsAllMatchingElements([
      <Router />,
      <Switch />,
      <Route />
    ]))
  })

  it('is should redirect to signin & signup if not logged', () => {
    auth.statusAuth = false
    const wrapper = mount(
      <App />
    )
    expect(wrapper.containsMatchingElement(<Auth />)).toBeTruthy()
    expect(wrapper.containsMatchingElement(<Home />)).toBeFalsy()
    expect(wrapper.containsMatchingElement(<Footer />)).toBeTruthy()
  })

  it('is should redirect to Home if logged', () => {
    auth.statusAuth = true
    const wrapper = mount(
      <App />
    )
    expect(wrapper.containsMatchingElement(<Auth />)).toBeFalsy()
    expect(wrapper.containsMatchingElement(<Home />)).toBeTruthy()
    expect(wrapper.containsMatchingElement(<Footer />)).toBeTruthy()
  })

  it('is should redirect to Add From if logged', () => {
    auth.statusAuth = true
    const wrapper = mount(
      <App />
    )
    expect(wrapper.containsMatchingElement(<AddData />)).toBeFalsy()
    expect(wrapper.containsMatchingElement(<Home />)).toBeTruthy()
    expect(wrapper.containsMatchingElement(<Footer />)).toBeTruthy()
  })
})

