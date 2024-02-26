import axios from "axios";

export const fetchExchangeRate = async (codeFromCurrency, codeToCurrency) => {
  try {
    const response = await axios.get(
      "https://api.freecurrencyapi.com/v1/latest",
      {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base_currency: codeFromCurrency,
          currencies: codeToCurrency,
        },
      }
    );
    return response.data.data[codeToCurrency];
  } catch (error) {
    throw new Error("Failed to fetch exchange rate");
  }
};
