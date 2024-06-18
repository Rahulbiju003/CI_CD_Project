import { render, screen, act } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  act(() => {
    render(<App />);
  });
});