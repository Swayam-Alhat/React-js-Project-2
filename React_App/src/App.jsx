import { useEffect, useState, useCallback } from "react";
import countryCodes from "./info";
function App() {
  const API_KEY = "5e040aad92e439e4045f2a7f";

  // usestate to default values at optionlist dropdown(INR or USD)
  const [fromCountryCode, setFromCountryCode] = useState("USD");
  const [toCountryCode, setToCountryCode] = useState("INR");

  // useState for inputfied for both to display
  const [fromCurrencyValue, setFromCurrencyValue] = useState(1);
  const [toCurrencyValue, setToCurrencyValue] = useState(0);

  // function to set selected fromCountry code
  function handleFromCountryCode(event) {
    setFromCountryCode(event.target.value);
  }

  // function to set selected toCountry sode
  function handleToCountryCode(event) {
    setToCountryCode(event.target.value);
  }

  // function to update fromCurrencyValue
  function handleFromCurrencyValue(event) {
    setFromCurrencyValue(event.target.value);
  }

  // fuunction to fetch the data
  const fetchData = useCallback(
    async (fromCountryCode, toCountryCode, fromCurrencyValue) => {
      try {
        // checks if the input is empty and handle it..

        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/5e040aad92e439e4045f2a7f/latest/${fromCountryCode}`
        );
        const data = await response.json();
        const dataAmount = data.conversion_rates[toCountryCode];
        const result = Number(fromCurrencyValue) * dataAmount;
        setToCurrencyValue(result);
      } catch (error) {
        alert("Error Occured:", error);
      }
    },
    [fromCountryCode, toCountryCode, fromCurrencyValue]
  );

  // calling the fetch function with two para
  useEffect(() => {
    fetchData(fromCountryCode, toCountryCode, fromCurrencyValue);
  }, [fromCountryCode, toCountryCode, fromCurrencyValue]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div id="main">
          <div
            id="wapper"
            className="w-[600px] h-auto bg-blue-950 px-5 py-2 *:mb-3"
          >
            <h1 className="text-3xl text-white font-bold text-center">
              Currency Converter
            </h1>
            <div
              id="from-container"
              className="w-full h-auto flex justify-between bg-black px-4 py-2"
            >
              <div id="from-input" className="flex flex-col gap-y-2">
                <label htmlFor="From-input" className="text-white text-[18px]">
                  From
                </label>
                <input
                  className="pl-2 outline-none py-2 mb-2 pr-2"
                  type="number"
                  value={fromCurrencyValue}
                  min={0}
                  id="From-input"
                  onChange={handleFromCurrencyValue}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="fromtype-input-label"
                  className="text-white text-[18px]"
                >
                  Currency Type
                </label>
                <select
                  onChange={handleFromCountryCode}
                  value={fromCountryCode}
                  id="fromtype-input-label"
                  className="outline-none py-2"
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              id="swap-button"
              className="w-full flex justify-center items-center"
            >
              <button className="bg-[#010101] text-[18px] transition-all duration-300 hover:bg-teal-100 border-none hover:scale-90 font-bold hover:text-black text-teal-100 px-3 py-2 outline-none">
                Swap
              </button>
            </div>
            <div
              id="to-container"
              className="w-full h-auto flex justify-between bg-black px-4 py-2"
            >
              <div id="to-input-container" className="flex flex-col gap-y-2">
                <label htmlFor="to-input" className="text-white text-[18px]">
                  To
                </label>
                <input
                  className="pl-2 outline-none py-2 mb-2 pr-2"
                  type="number"
                  min={0}
                  id="to-input"
                  readOnly
                  value={toCurrencyValue}
                />
              </div>
              <div id="type-input-wrapper" className="flex flex-col gap-y-2">
                <label
                  htmlFor="type-input-label-sec"
                  className="text-white text-[18px]"
                >
                  Currency Type
                </label>
                <select
                  value={toCountryCode}
                  onChange={handleToCountryCode}
                  id="type-input-label-sec"
                  className="outline-none py-2"
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div id="main-button" className="w-full flex justify-center">
              <button className="bg-[#010101] font-bold text-teal-100 w-full py-3 hover:text-[#010101] hover:scale-95 hover:bg-teal-100 text-[18px] duration-300 outline-none border-none">
                Convert {fromCountryCode} to {toCountryCode}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
