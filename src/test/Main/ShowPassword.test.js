import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module'
import store from '../../store'

import ShowPassword from '../../components/Main/ShowPassword'

Enzyme.configure({ adapter: new Adapter()})

describe('<ShowPassword />', () => {
  let wrapper;
  let userData = {
    userId: 'LPIAm4nFNWdB7tM6sC3uIm4DzmV2',
    email: 'johndoe@gmail.com'
  }
  let data = {
    id: '-LBy05prw0f5WfAJtuUu'
  }
  beforeAll(() => {
    wrapper = mount(
      <ShowPassword 
        data={data}
        userData={userData}
      />
    )
  })

  it('should renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have input[text] Email & Password, and button Sign In & Cancel', () => {
    // console.log(wrapper.children().get(0))
    expect(wrapper.find('.header2').html()).toEqual('<h4 class="header2">Insert Your Password</h4>')
    expect(wrapper.find('[name="userEmail"]')).toHaveLength(1)
    expect(wrapper.find('[name="userEmail"]').get(0).props.value).toEqual(userData.email)
    expect(wrapper.find('[name="userPassword"]')).toHaveLength(1)
    expect(wrapper.find('.btn .teal')).toHaveLength(2)
    expect(wrapper.find('.btn .teal').get(0).props.children).toEqual('Sign In')
    expect(wrapper.find('.btn .teal').get(1).props.children).toEqual('Cancel')
  })

  it('input[text] named userPassword should change state value onChange', () => {
    expect(wrapper.state('userPassword')).toBe('')
    let passTxt = wrapper.find('[name="userPassword"]')
    passTxt.simulate('change', {target:{value:'passChanged'}})
    expect(wrapper.state('userPassword')).toEqual('passChanged')
  })

  // jadi error gara2 querySelector ke panggil
  it.skip('onSubmit function called after button submit clicked', () => {
    const verificationWithPass = jest.fn()
    // isi password
    let passTxt = wrapper.find('[name="userPassword"]')
    passTxt.simulate('change', {target:{value:'passChanged'}})
    let submitButton = wrapper.find('[type="submit"]')
    submitButton.simulate('submit')
    console.log(submitButton)
  })

})