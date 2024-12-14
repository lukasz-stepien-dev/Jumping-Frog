import { render, fireEvent } from '@testing-library/react';
import Frog from './Frog';

test('Frog component jump function', () => {
    const { getByAltText } = render(<Frog />);
    const frogImage = getByAltText('frog');

    expect(frogImage).not.toHaveClass('jump');

    fireEvent.click(frogImage);

    expect(frogImage).toHaveClass('jump');

    setTimeout(() => {
        expect(frogImage).not.toHaveClass('jump');
    }, 500);
});