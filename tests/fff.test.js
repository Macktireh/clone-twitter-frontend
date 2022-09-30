import React from 'react';
import renderer from 'react-test-renderer';

import fff from '..\src\component\fff.js';

describe('<fff />', () => {
    it('should match the snapshot', () => {
      const component = renderer.create(<fff />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });