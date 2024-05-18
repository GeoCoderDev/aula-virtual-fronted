import React, { useState } from "react";
import useAPI from "./useAPI";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";

const useModalFeatures = () => {
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

export default useModalFeatures;
