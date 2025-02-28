import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../../components/Table";
import usePagination from "../../hooks/usePagination";

// Mock usePagination hook
jest.mock("../../hooks/usePagination");

describe("Table Component", () => {
  const mockColumns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
  ];

  const mockData = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const setupPaginationMock = (overrides = {}) => {
    (usePagination as jest.Mock).mockReturnValue({
      loading: false,
      totalPages: 2,
      currentData: mockData,
      currentPage: 1,
      hasNextPage: true,
      hasPrevPage: false,
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn(),
      gotToPage: jest.fn(),
      ...overrides,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table with correct headers", () => {
    setupPaginationMock();
    render(<Table apiUrl="fake-url" pageSize={2} columns={mockColumns} />);

    // Check for table headers
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  test("displays loading spinner when loading", () => {
    setupPaginationMock({ loading: true });
    render(<Table apiUrl="fake-url" pageSize={2} columns={mockColumns} />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("displays table data correctly", async () => {
    setupPaginationMock();
    render(<Table apiUrl="fake-url" pageSize={2} columns={mockColumns} />);

    // Check for data rows
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  test("pagination buttons work correctly", async () => {
    const goToNextPageMock = jest.fn();
    const goToPrevPageMock = jest.fn();

    setupPaginationMock({
      hasNextPage: true,
      hasPrevPage: true,
      goToNextPage: goToNextPageMock,
      goToPrevPage: goToPrevPageMock,
    });

    render(<Table apiUrl="fake-url" pageSize={2} columns={mockColumns} />);

    // Click Next button
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(goToNextPageMock).toHaveBeenCalled();

    // Click Previous button
    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(goToPrevPageMock).toHaveBeenCalled();
  });

  test("disables pagination buttons when necessary", () => {
    setupPaginationMock({ hasNextPage: false, hasPrevPage: false });

    render(<Table apiUrl="fake-url" pageSize={2} columns={mockColumns} />);

    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });
});
