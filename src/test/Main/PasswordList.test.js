import React, { Provider } from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module'
import store from '../../store'

import {PasswordList} from '../../components/Main/PasswordList'

Enzyme.configure({ adapter: new Adapter()})

describe('<PasswordList />', () => {
  let mountedComp;

  beforeAll(() => {
    mountedComp = mount(
      <Provider store={store}>
        <PasswordList store={store}/>
      </Provider>
    )
  })

  it.skip('should renders without crashing', () => {
    const div = document.createElement('div')
    console.log(mountedComp.find('thead'))
    ReactDOM.render(mountedComp, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})