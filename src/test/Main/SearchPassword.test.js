import React, { Provider } from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module'
import store from '../../store'

import SearchPassword from '../../components/Main/SearchPassword'

Enzyme.configure({ adapter: new Adapter()})

describe('<SearchPassword />', () => {
  let wrapper;
  
  beforeAll(() => {
    wrapper = mount(shallow(<SearchPassword store={store}/>).get(0))
  })

  it('should renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have tag div and input type text', () => {
    expect(wrapper.containsAllMatchingElements([
      <div><input id="searchPass"/></div>
    ])).toBeTruthy()
  })

  it('should have searchTerms state with empty string', () => {
    expect(wrapper.state('searchTerms')).toBe('')
  })

  it('input text onChange, searchTerms state should have changed', () => {
    wrapper.find('#searchPass').simulate('change', 
    {target:{value:'test'}})
    expect(wrapper.state('searchTerms')).toBe('test')
  })

  // cek buat liat state di store berubah belum
})