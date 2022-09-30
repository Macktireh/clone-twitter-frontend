import React from 'react';
import renderer from 'react-test-renderer';

import button from '..\src\component\button.js';

describe('<button />', () => {
    it('should match the snapshot', () => {
      const component = renderer.create(<button />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });