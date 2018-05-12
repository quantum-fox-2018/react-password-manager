import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount, dive } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module'
import store from '../../store'

import EditPassword from '../../components/Main/EditPassword'

Enzyme.configure({ adapter: new Adapter()})

describe('<EditPassword />', () => {
  let mountedComp;
  let propsData = {
    id: 'blabla',
    url: 'blabla.com',
    email: 'test@blabla.com',
    password: 'passwordny'
  }
  beforeAll(() => {
    // kalo mount doang state di dalem component EditPassword ga ke panggil
    mountedComp = mount(shallow(<EditPassword store={store} data={propsData}/>).get(0))
  })

  it('should renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(mountedComp, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have tag input with id (editUrl, editEmail, editPass) and button Edit + Cancel', () => {
    expect(mountedComp.containsAllMatchingElements([
      <input id={"editUrl"+propsData.id} />,
      <input id={"editEmail"+propsData.id} />,
      <input id={"editPass"+propsData.id} />,
      <button id={"submit"+propsData.id}>Edit</button>,
      <button>Cancel</button>
    ])).toBeTruthy()
  })

  it('It should have state editUrl, editEmail and editPass with data aaccording to Props', () => {
    expect(mountedComp.state('editId')).toBe('blabla')
    expect(mountedComp.state('editUrl')).toBe('blabla.com')
    expect(mountedComp.state('editEmail')).toBe('test@blabla.com')
    expect(mountedComp.state('editPass')).toBe('passwordny')
  })

  it('all State should have status value according to props password value', () => {
    // console.log(mountedComp.state())
    expect(mountedComp.state('upperCaseE')).toBe(false)
    expect(mountedComp.state('lowerCaseE')).toBe(true)
    expect(mountedComp.state('specialCharE')).toBe(false)
    expect(mountedComp.state('numberE')).toBe(false)
    expect(mountedComp.state('minLengthE')).toBe(true)
    expect(mountedComp.state('isItValidE')).toBe(false)
  })

  it('onChange, editUrl state have changed', () => {
    mountedComp.find('#editUrl'+propsData.id).simulate('change', 
    {target: {name: 'editUrl', value:'facebook.com'}})
    expect(mountedComp.state('editUrl')).toBe('facebook.com')
    mountedComp.setState({editUrl: ''}) // clear state after testing
  })

  it('onChange, editEmail state have changed', () => {
    mountedComp.find('#editEmail'+propsData.id).simulate('change', 
    {target: {name: 'editEmail', value:'testing@gmail.com'}})
    expect(mountedComp.state('editEmail')).toBe('testing@gmail.com')
    mountedComp.setState({editEmail: ''}) // clear state after testing
  })

  it('onChange, editPass state have changed', () => {
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'pwdcoy'}})
    expect(mountedComp.state('editPass')).toBe('pwdcoy')
  })

  // Password Validation
  it('upperCaseE state should be true when password contain Upper Case', () => {
    // if True
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'P'}})
    expect(mountedComp.state('upperCaseE')).toBeTruthy()
    // if False
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'p'}})
    expect(mountedComp.state('upperCaseE')).toBeFalsy()
  })

  it('lowerCaseE state should be true when password contain Lower Case', () => {
    // if True
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'b'}})
    expect(mountedComp.state('lowerCaseE')).toBeTruthy()
    // if False
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'B'}})
    expect(mountedComp.state('lowerCaseE')).toBeFalsy()
  })

  it('specialCharE state should be true when password contain Special Character', () => {
    // if True
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'$'}})
    expect(mountedComp.state('specialCharE')).toBeTruthy()
    // if False
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'dollar'}})
    expect(mountedComp.state('specialCharE')).toBeFalsy()
  })

  it('numberE state should be true when password contain Number', () => {
    // if True
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'with1'}})
    expect(mountedComp.state('numberE')).toBeTruthy()
    // if False
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'withoutnumbers'}})
    expect(mountedComp.state('numberE')).toBeFalsy()
  })

  it('minLengthE state should be true when password digits more than 5', () => {
    // if True
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'123456'}})
    expect(mountedComp.state('minLengthE')).toBeTruthy()
    // if False
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'12345'}})
    expect(mountedComp.state('minLengthE')).toBeFalsy()
  })
  
  it('isItValidE state should be true when password is Valid', () => {
    // if True
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'Aa@2morethan5'}})
    expect(mountedComp.state('isItValidE')).toBeTruthy()
    // if False
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'notvalidPass'}})
    expect(mountedComp.state('isItValidE')).toBeFalsy()
  })

  it('submit Edited password works well', () => {
    const submitDataPass = jest.fn() // mock function submit
    // isi text input :
    mountedComp.find('#editUrl'+propsData.id).simulate('change', 
    {target: {name: 'editUrl', value:'gamilEdit.com'}})
    mountedComp.find('#editEmail'+propsData.id).simulate('change', 
    {target: {name: 'editEmail', value:'gmail@gamil.com'}})
    mountedComp.find('#editPass'+propsData.id).simulate('change', 
    {target: {name: 'editPass', value:'Aa@2morethan5'}})

    mountedComp.find('#submit'+propsData.id).simulate('submit')
    // mountedComp.find('#submit'+propsData.id).toHaveBeenCalledTimes(1)
    expect(mountedComp.state('editUrl')).toBe('gamilEdit.com')
    expect(mountedComp.state('editEmail')).toBe('gmail@gamil.com')
    expect(mountedComp.state('editPass')).toBe('Aa@2morethan5')
  })
})