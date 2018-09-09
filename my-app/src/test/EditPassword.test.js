import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import store from '../store'
import LocalStorageMock from './localstorageMock'
import renderer from 'react-test-renderer'
import EditPassword from '../components/EditPassword'

global.localStorage = new LocalStorageMock();
Enzyme.configure({ adapter: new Adapter() });


describe('<AddPassword/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = mount(
    <Provider store={store}>
      <EditPassword/>
    </Provider>
    )
    ReactDOM.render(wrapper, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders without crashing snapshot', () => {
    const rendered = renderer.create(
    <Provider store={store}>
      <EditPassword/>
    </Provider>)
    expect(rendered).toMatchSnapshot()
  });
})