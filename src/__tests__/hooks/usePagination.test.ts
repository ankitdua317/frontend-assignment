import { renderHook, act, waitFor } from "@testing-library/react";
import fetchData from "../../api/fetchData";
import usePagination from "../../hooks/usePagination";

// Mock API call
jest.mock("../../api/fetchData");

describe("usePagination Hook", () => {
  const mockData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));

  beforeEach(() => {
    jest.clearAllMocks();
    (fetchData as jest.Mock).mockResolvedValue({ data: mockData });
  });

  test("initial state: loading should be true", async () => {
    const { result } = renderHook(() => usePagination("fake-url", 5));

    expect(result.current.loading).toBe(true);
  });

  test("fetches data and calculates total pages correctly", async () => {
    const { result } = renderHook(() => usePagination("fake-url", 5));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.totalPages).toBe(2); // 10 items, page size 5 → 2 pages
    expect(result.current.currentData).toHaveLength(5);
  });

  test("navigates to next page", async () => {
    const { result } = renderHook(() => usePagination("fake-url", 5));

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  test("navigates to previous page", async () => {
    const { result } = renderHook(() => usePagination("fake-url", 5));

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.goToNextPage();
      result.current.goToPrevPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  test("handles API fetch error", async () => {
    (fetchData as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => usePagination("fake-url", 5));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.totalPages).toBe(0);
    expect(result.current.currentData).toEqual([]);
  });
});
