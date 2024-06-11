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
  interest: interest.toLowerCase(),
  suggestion: {
    title: `Demo task with '${interest}'`,
    description: `This is a demo task related to ${interest}.`
  }
}));

console.log(defaultSuggestions);


    try {
        console.log("caut sugesti")
      const response = await axios.get(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/suggest/9`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Suggestions response:", response.data); // Log the response
      if (response.data && Array.isArray(response.data)) {
        return defaultSuggestions
      } else {
        throw new Error("Invalid format: Expected an array.");
      }
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

    console.log("fetching suggestions");
    fetchSuggestions();
    
  }, [user]);

  return (
    <SuggestionsContext.Provider value={{ suggestions }}>
      {children}
    </SuggestionsContext.Provider>
  );
};
