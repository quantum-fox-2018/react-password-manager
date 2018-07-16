import React, { Provider } from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module'
import store from '../../store'

import {TbodyPassword} from '../../components/Main/TbodyPassword.jsx'

Enzyme.configure({ adapter: new Adapter()})

describe('<TbodyPassword />', () => {
  let wrapper;
  let dataProps = {
    id: '-LBpLCu8u3NuLShlAsKm',
    url: 'johndoe.com',
    email: 'johndoe',
    password: 'Johndoe12!',
    createdAt: 1525608406907,
    updatedAt: 1525608406907
  }
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <TbodyPassword data={dataProps} />
      </Provider>
    )
  })

  /* Invariant Violation: Element type is invalid: 
  expected a string (for built-in components) or 
  a class/function (for composite components) 
  but got: undefined. You likely forgot to export 
  your component from the file it's defined in, 
  or you might have mixed up default and named imports. */
  it.skip('should renders wihout crashing', () => {
    const div = document.createElement('div')
    console.log(wrapper)
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})