interface ApiResponse<T> {
  data: T;
  status: number;
}

async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: T = await response.json();
    return { data, status: response.status };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default fetchData;
