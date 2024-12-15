import { render } from '@testing-library/react';
import App from './App';

test('Instruction component renders correctly in App.js', () => {
    const { getByText } = render(<App />);
    const instructionElement = getByText(/Tap to jump!/i);
    expect(instructionElement).toBeInTheDocument();
});

test('Frog component renders correctly in App.js', () => {
    const { getByAltText } = render(<App />);
    const frogImage = getByAltText('frog');
    expect(frogImage).toBeInTheDocument();
});
