import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import store from '../store'
import LocalStorageMock from './localstorageMock'
import {Home} from '../components/Home'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

global.localStorage = new LocalStorageMock();
Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  data: [],
  loading: false,
  error: false
}
const mockStore = configureStore()
let storeMock, mountTest
beforeEach(() => {
  storeMock = mockStore(initialState)
  shallowTest = shallow(<Home store={storeMock}/>)
})
describe('<Home/>', () => {
  it('render without crashing', () =>{
    const div = document.createElement('div');
    const wrapper = mount(
      <Provider store={store} data={initialState}>
        <Home/>
      </Provider>
      )
      // initialState.loading = true
    console.log('=====home====', wrapper)
    ReactDOM.render(wrapper, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})