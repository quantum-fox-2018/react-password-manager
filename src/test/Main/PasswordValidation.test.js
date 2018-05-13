import React, { Provider } from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module'
import store from '../../store'

import PasswordValidation from '../../components/Main/PasswordValidation'

Enzyme.configure({ adapter: new Adapter()})

describe('<PasswordValidation />', () => {
	let props = {
		upperCase: false,
		lowerCase: false,
		specialChar: false,
		number: false,
		minLength: false
	}
	let mountComp;

	beforeAll(() => {
		mountComp = mount(
			<PasswordValidation 
				upperCase={props.upperCase}
				lowerCase={props.lowerCase}
				specialChar={props.specialChar}
				number={props.number}
				minLength={props.minLength}
			/>
		)
	})

	it('renders without crashing', () => {
		const div = document.createElement('div')
    ReactDOM.render(mountComp, div)
    ReactDOM.unmountComponentAtNode(div)
	})

	it('should have tag h5 and ul list', () => {
		expect(mountComp.find('div')).toHaveLength(1)
		expect(mountComp.find('h5')).toHaveLength(1)
		expect(mountComp.find('ul')).toHaveLength(1)
		expect(mountComp.find('li')).toHaveLength(5)
	})

	it('upperCase li should not have teal className', () => {
		let wrapper = mount(
			<PasswordValidation 
				upperCase={props.upperCase}
			/>
		)
		let uCaseLi = wrapper.find('.collection-item').get(0) 
		expect(uCaseLi.props.children).toBe('[ ] Password must contain Upper Case')
		expect(uCaseLi.props.className).toBe('collection-item')
	})

	it('upperCase li should have teal className', () => {
		props.upperCase = true
		let wrapper = mount(
			<PasswordValidation 
				upperCase={props.upperCase}
			/>
		)
		let uCaseLi = wrapper.find('.collection-item').get(0) 
		expect(uCaseLi.props.children).toBe('[*] Password must contain Upper Case')
		expect(uCaseLi.props.className).toBe('collection-item teal')
	})

	it('lowerCase li should not have teal className', () => {
		let wrapper = mount(
			<PasswordValidation 
				lowerCase={props.lowerCase}
			/>
		)
		let lCaseLi = wrapper.find('.collection-item').get(1) 
		expect(lCaseLi.props.children).toBe('[ ] Password must contain Lower Case')
		expect(lCaseLi.props.className).toBe('collection-item')
	})

	it('lowerCase li should have teal className', () => {
		props.lowerCase = true
		let wrapper = mount(
			<PasswordValidation 
				lowerCase={props.lowerCase}
			/>
		)
		let lCaseLi = wrapper.find('.collection-item').get(1) 
		expect(lCaseLi.props.children).toBe('[*] Password must contain Lower Case')
		expect(lCaseLi.props.className).toBe('collection-item teal')
	})

	it('specialChar li should not have teal className', () => {
		let wrapper = mount(
			<PasswordValidation 
				specialChar={props.specialChar}
			/>
		)
		let sCaseLi = wrapper.find('.collection-item').get(2) 
		expect(sCaseLi.props.children).toBe('[ ] Password must contain Special Character');
		expect(sCaseLi.props.className).toBe('collection-item')
	})

	it('specialChar li should have teal className', () => {
		props.specialChar = true
		let wrapper = mount(
			<PasswordValidation 
				specialChar={props.specialChar}
			/>
		)
		let sCaseLi = wrapper.find('.collection-item').get(2) 
		expect(sCaseLi.props.children).toBe('[*] Password must contain Special Character');
		expect(sCaseLi.props.className).toBe('collection-item teal')
	})

	it('number li should not have teal className', () => {
		let wrapper = mount(
			<PasswordValidation 
				number={props.number}
			/>
		)
		let numLi = wrapper.find('.collection-item').get(3) 
		expect(numLi.props.children).toBe('[ ] Password must contain at least 1 number');
		expect(numLi.props.className).toBe('collection-item')
	})

	it('number li should have teal className', () => {
		props.number = true
		let wrapper = mount(
			<PasswordValidation 
				number={props.number}
			/>
		)
		let numLi = wrapper.find('.collection-item').get(3) 
		expect(numLi.props.children).toBe('[*] Password must contain at least 1 number');
		expect(numLi.props.className).toBe('collection-item teal')
	})

	it('minLength li should not have teal className', () => {
		let wrapper = mount(
			<PasswordValidation 
				minLength={props.minLength}
			/>
		)
		let minLenLi = wrapper.find('.collection-item').get(4) 
		expect(minLenLi.props.children).toBe('[ ] Password minimal 6 digits');
		expect(minLenLi.props.className).toBe('collection-item')
	})

	it('minLength li should have teal className', () => {
		props.minLength = true
		let wrapper = mount(
			<PasswordValidation 
				minLength={props.minLength}
			/>
		)
		let minLenLi = wrapper.find('.collection-item').get(4) 
		expect(minLenLi.props.children).toBe('[*] Password minimal 6 digits');
		expect(minLenLi.props.className).toBe('collection-item teal')
	})
})