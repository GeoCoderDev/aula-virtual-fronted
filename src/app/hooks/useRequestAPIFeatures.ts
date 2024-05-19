import { useState } from "react";
import useAPI from "./useAPI";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";

const useRequestAPIFeatures = () => {
  const [isSomethingLoading, setIsSomethingLoading] = useState(false);
  const [error, setError] = useState<ErrorAPI | null>(null);
  const [successMessage, setSuccessMessage] = useState<SuccessMessageAPI | null>(null);
  const { fetchAPI, fetchCancelables } = useAPI();

  return {
    fetchAPI,
    fetchCancelables,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  };
};

export default useRequestAPIFeatures;
