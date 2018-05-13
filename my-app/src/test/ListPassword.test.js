import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import store from '../store'
import LocalStorageMock from './localstorageMock'
import {ListPassword} from '../components/ListPassword'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'

global.localStorage = new LocalStorageMock();
Enzyme.configure({ adapter: new Adapter() });

describe('<ListPassword/>', () => {
  it('render without crashing', () =>{
    const div = document.createElement('div');
    const wrapper = mount(
    <Provider store={store}>
      <ListPassword/>
    </Provider>
    )
    ReactDOM.render(wrapper, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders without crashing snapshot', () => {
    const rendered = renderer.create(
      <Provider store={store}>
      <ListPassword/>
    </Provider>
    )
    expect(rendered).toMatchSnapshot()
  });
})