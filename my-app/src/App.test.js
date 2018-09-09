import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import store from './store'
import Privateroute from './test/localstorageMock'
import renderer from 'react-test-renderer'

global.localStorage = new LocalStorageMock();
// let localStorage = new LocalStorageMock();
Enzyme.configure({ adapter: new Adapter() });

import LocalStorageMock from './test/localstorageMock'
import App from './App';


describe('<App/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = mount(
    <Provider store={store}>
    <App/>
    </Provider>
    )
    ReactDOM.render(wrapper, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render <Route/> <Privateroute/> <Switch/>', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.containsAllMatchingElements([
      <Switch/>,
      <Route/>,
      <Privateroute/>,
    ])).toHaveLength[7]
  })

  it('renders without crashing', () => {
    const rendered = renderer.create(
    <Provider store={store}>
      <App/>
    </Provider>)
    expect(rendered).toMatchSnapshot()
  });
})


