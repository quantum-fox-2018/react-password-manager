import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module'
import store from '../../store'

import AddPassword from '../../components/Main/AddPassword'

Enzyme.configure({ adapter: new Adapter()})

describe('<AddPassword />', () => {
  let mountedComp;

  beforeAll(() => {
    // kalo mount doang state di dalem component AddPassword ga ke panggil
    mountedComp = mount(shallow(<AddPassword store={store}/>).get(0))
  })

  it('should renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(mountedComp, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have tag input with id (newUrl, newEmail, newPassword) and button submit', () => {
    expect(mountedComp.containsAllMatchingElements([
      <input id="newUrl" />,
      <input id="newEmail" />,
      <input id="newPassword" />,
      <button>Add</button>
    ])).toBeTruthy()
  })

  it('It should have state newUrl, newEmail and newPassword with empty string', () => {
    expect(mountedComp.state('newUrl')).toBe('')
    expect(mountedComp.state('newEmail')).toBe('')
    expect(mountedComp.state('newPassword')).toBe('')
  })

  it('all State should have false value when rendered', () => {
    expect(mountedComp.state('upperCase')).toBe(false)
    expect(mountedComp.state('lowerCase')).toBe(false)
    expect(mountedComp.state('specialChar')).toBe(false)
    expect(mountedComp.state('number')).toBe(false)
    expect(mountedComp.state('minLength')).toBe(false)
    expect(mountedComp.state('isItValid')).toBe(false)
  })

  it('onChange, newUrl state have changed', () => {
    mountedComp.find('#newUrl').simulate('change', 
    {target: {name: 'newUrl', value:'facebook.com'}})
    expect(mountedComp.state('newUrl')).toBe('facebook.com')
    mountedComp.setState({newUrl: ''}) // clear state after testing
  })

  it('onChange, newEmail state have changed', () => {
    mountedComp.find('#newEmail').simulate('change', 
    {target: {name: 'newEmail', value:'testing@gmail.com'}})
    expect(mountedComp.state('newEmail')).toBe('testing@gmail.com')
    mountedComp.setState({newEmail: ''}) // clear state after testing
  })

  it('onChange, newPassword state have changed', () => {
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'pwdcoy'}})
    expect(mountedComp.state('newPassword')).toBe('pwdcoy')
  })

  // Password Validation
  it('upperCase state should be true when password contain Upper Case', () => {
    // if True
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'P'}})
    expect(mountedComp.state('upperCase')).toBeTruthy()
    // if False
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'p'}})
    expect(mountedComp.state('upperCase')).toBeFalsy()
  })

  it('lowerCase state should be true when password contain Lower Case', () => {
    // if True
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'b'}})
    expect(mountedComp.state('lowerCase')).toBeTruthy()
    // if False
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'B'}})
    expect(mountedComp.state('lowerCase')).toBeFalsy()
  })

  it('specialChar state should be true when password contain Special Character', () => {
    // if True
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'$'}})
    expect(mountedComp.state('specialChar')).toBeTruthy()
    // if False
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'dollar'}})
    expect(mountedComp.state('specialChar')).toBeFalsy()
  })

  it('number state should be true when password contain Number', () => {
    // if True
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'with1'}})
    expect(mountedComp.state('number')).toBeTruthy()
    // if False
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'withoutnumbers'}})
    expect(mountedComp.state('number')).toBeFalsy()
  })

  it('minLength state should be true when password digits more than 5', () => {
    // if True
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'123456'}})
    expect(mountedComp.state('minLength')).toBeTruthy()
    // if False
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'12345'}})
    expect(mountedComp.state('minLength')).toBeFalsy()
  })
  
  it('isItValid state should be true when password is Valid', () => {
    // if True
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'Aa@2morethan5'}})
    expect(mountedComp.state('isItValid')).toBeTruthy()
    // if False
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'notvalidPass'}})
    expect(mountedComp.state('isItValid')).toBeFalsy()
  })

  // it('add Button should be showed when all state is true', () => {
    
  // })

  it('submit works well', () => {
    const submitDataPass = jest.fn() // mock function submit
    // isi text input :
    mountedComp.find('#newUrl').simulate('change', 
    {target: {name: 'newUrl', value:'gamil.com'}})
    mountedComp.find('#newEmail').simulate('change', 
    {target: {name: 'newEmail', value:'gmail@gamil.com'}})
    mountedComp.find('#newPassword').simulate('change', 
    {target: {name: 'newPassword', value:'Aa@2morethan5'}})
    expect(mountedComp.state('newUrl')).toBe('gamil.com')
    expect(mountedComp.state('newEmail')).toBe('gmail@gamil.com')
    expect(mountedComp.state('newPassword')).toBe('Aa@2morethan5')

    mountedComp.find('#addPass').simulate('submit')
    // console.log(submitDataPass)
    // expect(mountedComp.submitDataPass).toHaveBeenCalledTimes(1)
    // kenapa kosong karena ada fungsi untuk reset state di dalam submitDataPass
    expect(mountedComp.state('newUrl')).toBe('')
    expect(mountedComp.state('newEmail')).toBe('')
    expect(mountedComp.state('newPassword')).toBe('')
  })
})