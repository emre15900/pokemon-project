import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SavedCards from "@/pages/saved";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SavedCards component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders 'No saved cards' when there are no saved cards", () => {
    render(<SavedCards />);
    expect(screen.getByText(/No saved cards/i)).toBeInTheDocument();
  });

  test("renders saved cards correctly", async () => {
    const mockSavedCards = [
      { id: 1, name: "Charmander", images: { small: "charmander.jpg" } },
      { id: 2, name: "Pikachu", images: { small: "pikachu.jpg" } },
    ];
    localStorage.setItem("savedCards", JSON.stringify(mockSavedCards));

    render(<SavedCards />);

    await waitFor(() => {
      expect(screen.getByText(/Saved Pokémon Cards/i)).toBeInTheDocument();
      expect(screen.getByAltText("Charmander")).toBeInTheDocument();
      expect(screen.getByAltText("Pikachu")).toBeInTheDocument();
    });
  });

  test("removes a saved card", async () => {
    const mockSavedCard = {
      id: 1,
      name: "Charmander",
      images: { small: "charmander.jpg" },
    };
    localStorage.setItem("savedCards", JSON.stringify([mockSavedCard]));

    render(<SavedCards />);

    await waitFor(() => {
      expect(screen.getByAltText("Charmander")).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole("button", { name: "Remove Card" }));

    await waitFor(() => {
      expect(screen.queryByAltText("Charmander")).not.toBeInTheDocument();
      expect(screen.getByText(/No saved cards/i)).toBeInTheDocument();
    });
  });

  test("navigates back to Home page", () => {
    const pushMock = jest.fn();
    require("next/router").useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    render(<SavedCards />);

    userEvent.click(screen.getByRole("button", { name: "Back to Home" }));

    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
