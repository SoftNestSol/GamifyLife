import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./auth.context";

export const SuggestionsContext = createContext({});

export const useSuggestionsContext = () => {
  const context = useContext(SuggestionsContext);
  if (!context) {
    throw new Error("useSuggestionsContext must be used within a SuggestionsProvider");
  }
  return context;
};

export const SuggestionsProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async () => {
    const interests = ['Fitness', 'Gaming', 'Yoga'];
    const defaultSuggestions = interests.map(interest => ({
      title: `Demo task with '${interest}'`,
      description: `This is a demo task related to ${interest}.`
    }));

    try {
      const response = await axios.get(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/suggest/${user.uid}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Suggestions response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log(
        "Error fetching suggestions:",
        error.response ? error.response.data : error.message
      );
      return defaultSuggestions;
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestionsData = await getSuggestions();
      setSuggestions(suggestionsData);
    };

    if (user?.uid) {
      fetchSuggestions();
    }
  }, [user]);

  return (
    <SuggestionsContext.Provider value={{ suggestions }}>
      {children}
    </SuggestionsContext.Provider>
  );
};
