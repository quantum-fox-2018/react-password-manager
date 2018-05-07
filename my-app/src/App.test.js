import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LocalStorageMock from './test/localstorageMock.js'
import App from './App';

global.localStorage = new LocalStorageMock
Enzyme.configure({ adapter: new Adapter() });

describe('<App/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
