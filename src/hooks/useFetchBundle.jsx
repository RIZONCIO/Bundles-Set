import { useState, useEffect } from "react";
import API_ENDPOINTS from "../config/api";

const useFetchBundles = (limit = 20) => {
    const [bundles, setBundles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBundles = async (page = 1) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_ENDPOINTS.BUNDLES}?page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados");
            }
            const data = await response.json();
            setBundles((prevBundles) => [...prevBundles, ...data.bundles]);
            setCurrentPage(data.page);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBundles(currentPage);
    }, []);

    return { bundles, fetchBundles, currentPage, totalPages, isLoading, error };
};

export default useFetchBundles;