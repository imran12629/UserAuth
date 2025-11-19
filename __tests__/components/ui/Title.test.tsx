import React from 'react';
import { render } from '@testing-library/react-native';
import Title from '../../../src/components/ui/Title';


describe('Title Component', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<Title title="Main Title" />);
    expect(getByText('Main Title')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <Title title="Main Title" subtitle="Subtitle text" />
    );
    expect(getByText('Subtitle text')).toBeTruthy();
  });

  it('does not fail when subtitle is not provided', () => {
    const { queryByText } = render(<Title title="Only Title" />);
    expect(queryByText('undefined')).toBeFalsy();
  });


  it('applies custom title text style', () => {
    const { getByText } = render(
      <Title
        title="Styled Title"
        textStyle={{ color: 'green', fontSize: 30 }}
      />
    );

    const title = getByText('Styled Title');
    expect(title.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'green', fontSize: 30 })])
    );
  });

  it('applies custom subtitle text style', () => {
    const { getByText } = render(
      <Title
        title="Main"
        subtitle="Styled Subtitle"
        subtitleStyle={{ color: 'purple' }}
      />
    );

    const subtitle = getByText('Styled Subtitle');
    expect(subtitle.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'purple' })])
    );
  });
});
