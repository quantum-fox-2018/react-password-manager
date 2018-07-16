import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount, dive } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module'
import configureStore from 'redux-mock-store'
import store from '../../store'

import PasswordContent from '../../components/Main/PasswordContent'
import {TbodyPassword} from '../../components/Main/TbodyPassword'

Enzyme.configure({ adapter: new Adapter()})

// di skip dulu susah nested props nya
let dummy = {
  id:'dum',
  url:'dummy',
  email:'dummy@gmail.com',
  password:'dumdum',
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('<PasswordContent />', () => {
  const initialState = {
    passwords: {
      data: [],
      loading: true,
      error: {
        status: false,
        message: ''
      },
      searchValue: 'adaisi',
      searchData: [dummy]
    }
  }
  const mockStore = configureStore()

  let mountedComp, shallowComp, storeMock;

  beforeAll(() => {
    storeMock = mockStore(initialState)
    mountedComp = mount(<PasswordContent store={storeMock} />)
    shallowComp = shallow(<PasswordContent store={storeMock} />)
  })

  it('should renders without crashing', () => {
    const div = document.createElement('div')
    // console.log('=========================')
    // console.log(shallowComp.prop('passwords'))
    // console.log(mountedComp.find(TbodyPassword))
    ReactDOM.render(shallowComp, div)
    ReactDOM.unmountComponentAtNode(div)
    // initialState.passwords.loading = true
  })

  it('should render loading component', () => {
    // initialState.passwords.loading = true
    // console.log('=========================')
    // // mountedComp.update()
    // console.log(mountedComp.prop('passwords'))
    // console.log(mountedComp.find('.indeterminate'))
    // console.log(JSON.stringify(mountedComp.children().get(0), null, 2))
    expect(mountedComp.containsAllMatchingElements([
      <tr><td colSpan="6">
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </td></tr>
    ])).toBeTruthy()
    initialState.passwords.loading = false
    initialState.passwords.searchValue = 'adaisi'
  })

  it('should render TbodyPassword with searchData Value', () => {
    initialState.passwords.searchValue = 'adaisi'
    console.log('==============================')
    console.log(shallowComp.prop('passwords'))
    console.log(mountedComp.children().get(0))
    console.log(mountedComp.find('td'))
  })

  // it('should render TbodyPassword with data value', () => {

  // })

  // it('shoulde render Error Component', () => {

  // })
})