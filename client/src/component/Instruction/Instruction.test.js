import { render } from '@testing-library/react';
import Instruction from './Instruction';

test('Instruction component renders correctly', () => {
    const { getByText } = render(<Instruction />);
    const headerElement = getByText(/Tap to jump!/i);

    // Check if the header element is in the document
    expect(headerElement).toBeInTheDocument();
});