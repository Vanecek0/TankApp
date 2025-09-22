import React from 'react';
import { render } from '@testing-library/react-native';
import RootLayout from '@/app/_layout';

describe('Index screen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toBeTruthy();
  });
});