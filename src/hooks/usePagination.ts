import { useEffect, useState } from "react";
import fetchData from "../api/fetchData";

const usePagination = <T>(apiUrl: string, pageSize: number) => {
  const [totalData, setTotalData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalData.length / pageSize);

  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const goToPrevPage = () => setCurrentPage((prev) => prev - 1);
  const gotToPage = (page: number) => setCurrentPage(page);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetchData<T[]>(apiUrl);
        setTotalData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, [apiUrl]);

  return {
    totalPages: totalPages,
    currentData: totalData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ),
    currentPage,
    hasNextPage: currentPage !== totalPages,
    hasPrevPage: currentPage > 1,
    goToNextPage,
    goToPrevPage,
    gotToPage,
  };
};

export default usePagination;
