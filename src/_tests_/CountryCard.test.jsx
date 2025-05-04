import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from "../components/CountryCard";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { vi } from "vitest";

// Mock useAuth
vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const mockCountry = {
  cca3: "USA",
  name: { common: "United States" },
  population: 331002651,
  region: "Americas",
  capital: ["Washington D.C."],
  flags: {
    svg: "https://flagcdn.com/us.svg",
    png: "https://flagcdn.com/us.png",
  },
};

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("CountryCard", () => {
  it("renders country data correctly", () => {
    useAuth.mockReturnValue({
      isFavorite: () => false,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      user: { id: "123" },
    });

    renderWithRouter(<CountryCard country={mockCountry} />);

    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("331,002,651")).toBeInTheDocument();
    expect(screen.getByText("Americas")).toBeInTheDocument();
    expect(screen.getByText("Washington D.C.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to favorites/i })
    ).toBeInTheDocument();
  });

  it("toggles favorite when button is clicked", () => {
    const addFavorite = vi.fn();
    const removeFavorite = vi.fn();

    useAuth.mockReturnValue({
      isFavorite: () => false,
      addFavorite,
      removeFavorite,
      user: { id: "123" },
    });

    renderWithRouter(<CountryCard country={mockCountry} />);
    const button = screen.getByRole("button", { name: /add to favorites/i });

    fireEvent.click(button);

    expect(addFavorite).toHaveBeenCalledWith("USA");
    expect(removeFavorite).not.toHaveBeenCalled();
  });

  it("does not show favorite button when user is not logged in", () => {
    useAuth.mockReturnValue({
      isFavorite: () => false,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      user: null,
    });

    renderWithRouter(<CountryCard country={mockCountry} />);
    expect(
      screen.queryByRole("button", { name: /add to favorites/i })
    ).not.toBeInTheDocument();
  });

  it("navigates to detail page when 'View Details' is clicked", () => {
    useAuth.mockReturnValue({
      isFavorite: () => false,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      user: { id: "123" },
    });

    renderWithRouter(<CountryCard country={mockCountry} />);
    const link = screen.getByRole("link", { name: /view details/i });

    expect(link).toHaveAttribute("href", "/country/USA");
  });
});
