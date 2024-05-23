import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/pages';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders Pokémon Cards title', () => {
    const titleElement = screen.getByText(/Pokémon Cards/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders Load More button', () => {
    const loadMoreButton = screen.getByRole('button', { name: /Load More/i });
    expect(loadMoreButton).toBeInTheDocument();
  });

  test('displays loading spinner initially', () => {
    const loadingSpinner = screen.getByRole('progressbar');
    expect(loadingSpinner).toBeInTheDocument();
  });

  test('loads more cards when Load More button is clicked', async () => {
    const initialCardsCount = screen.getAllByRole('img', { name: /Card Image/i }).length;
    const loadMoreButton = screen.getByRole('button', { name: /Load More/i });
    fireEvent.click(loadMoreButton);
    await waitFor(() => {
      const newCardsCount = screen.getAllByRole('img', { name: /Card Image/i }).length;
      expect(newCardsCount).toBeGreaterThan(initialCardsCount);
    });
  });

  test('saves a card when Save Card button is clicked', () => {
    const saveCardButton = screen.getAllByRole('button', { name: /Save Card/i })[0];
    fireEvent.click(saveCardButton);
    const savedCardsBadge = screen.getByRole('button', { name: /Saved Cards/i });
    expect(savedCardsBadge).toHaveTextContent('1');
  });

  test('removes a card when Remove Card button is clicked', async () => {
    const removeCardButton = screen.getAllByRole('button', { name: /Remove Card/i })[0];
    fireEvent.click(removeCardButton);
    await waitFor(() => {
      const savedCardsBadge = screen.getByRole('button', { name: /Saved Cards/i });
      expect(savedCardsBadge).toHaveTextContent('0');
    });
  });

  test('removes all cards when Remove All button is clicked', async () => {
    const removeAllButton = screen.getByRole('button', { name: /Remove All/i });
    fireEvent.click(removeAllButton);
    await waitFor(() => {
      const savedCardsBadge = screen.getByRole('button', { name: /Saved Cards/i });
      expect(savedCardsBadge).toHaveTextContent('0');
    });
  });
});
