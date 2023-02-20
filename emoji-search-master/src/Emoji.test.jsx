import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Is smiley filter work", () => {
  let header;

  beforeEach(() => {
    render(<App />);

    header = screen.getByText("Emoji Search");
  });

  test("is header rendering?", () => {
    expect(header).toBeInTheDocument();
  });

  test("is list rendering?", () => {
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Laughing")).toBeInTheDocument();
    expect(screen.getByText("Kissing Heart")).toBeInTheDocument();
  });

  test("filtreleme", () => {
    userEvent.type(screen.getByTestId("input"), "grinning");
    expect(screen.getByText("Smile Cat")).toBeInTheDocument();
  });

  test("is copying?", () => {
    userEvent.click(screen.getByText("100"));
    let input = screen.getByRole("textbox");
    userEvent.paste(input, true);
    expect(input).toHaveValue("💯");
  });

  test("copy", () => {
    const copytext = screen.getAllByText("Click to copy emoji");
    fireEvent.click(screen.getAllByText("Click to copy emoji"));
    const input = screen.getByRole("textbox");
    userEvent.paste(input, copytext);
    expect(input.length === 1);
  });
});
