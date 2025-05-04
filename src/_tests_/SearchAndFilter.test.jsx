import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndFilter from "../components/SearchAndFilter";
import { vi } from "vitest";

describe("SearchAndFilter", () => {
  const mockCountries = [
    {
      name: { common: "Canada" },
      region: "Americas",
      languages: { eng: "English", fra: "French" },
    },
    {
      name: { common: "Japan" },
      region: "Asia",
      languages: { jpn: "Japanese" },
    },
    {
      name: { common: "France" },
      region: "Europe",
      languages: { fra: "French" },
    },
    {
      name: { common: "Egypt" },
      region: "Africa",
      languages: { ara: "Arabic" },
    },
  ];

  const mockSetFilteredCountries = vi.fn();

  beforeEach(() => {
    render(
      <SearchAndFilter
        countries={mockCountries}
        setFilteredCountries={mockSetFilteredCountries}
      />
    );
  });

  it("renders all filter controls", () => {
    expect(
      screen.getByPlaceholderText("Search for a country...")
    ).toBeInTheDocument();
    expect(screen.getByText("Filter by Region")).toBeInTheDocument();
    expect(screen.getByText("Filter by Language")).toBeInTheDocument();
  });

  it("updates search term and filters countries", () => {
    const searchInput = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(searchInput, { target: { value: "can" } });

    expect(searchInput.value).toBe("can");
    expect(mockSetFilteredCountries).toHaveBeenCalledWith([
      expect.objectContaining({ name: { common: "Canada" } }),
    ]);
  });

  it("extracts and displays all unique languages", async () => {
    // Wait for languages to be loaded
    await screen.findByText("Filter by Language");
    const languageOptions = screen.getAllByRole("option", {
      name: /english|french|japanese|arabic/i,
    });

    expect(languageOptions).toHaveLength(4);
  });
});
