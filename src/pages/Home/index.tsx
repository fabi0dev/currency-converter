import { useEffect, useState } from "react";
import { Box, Header, Input, Select, Toggle } from "../../components";
import currencyAPI from "../../services/currencyAPI";
import localforage from "localforage";

interface IValueConvert {
  from?: number;
  to?: number;
}

export default function Home() {
  const mainCurrencies = ["BRL", "USD", "AUD", "EUR", "CAD"];
  const [isMainCurrencies, setIsMainCurrencies] = useState(true);
  const [statusAPI, setStatusAPI] = useState({
    quotas: {
      month: {
        total: 0,
        used: 0,
        remaining: 0,
      },
    },
  });
  const [valueConvert, setValueConvert] = useState<IValueConvert>({
    from: 0,
    to: 0,
  });

  const [dataCurrency, setDataCurrency] = useState({
    data: {},
  });

  const [dataLatest, setDataLatest] = useState({
    data: {},
  });

  const initialCurrency = {
    name: "",
    name_plural: "",
    symbol: "",
    value: 0,
  };

  const [currencySelected, setCurrencySelected] = useState({
    from: initialCurrency,
    to: initialCurrency,
  });

  const getCurrencies = async () => {
    const localCurrencies = await localforage.getItem("_CURRENCIES");

    if (localCurrencies == null) {
      const data = await currencyAPI.getCurrencies();
      localforage.setItem("_CURRENCIES", data);
      setDataCurrency(data as never);
    } else {
      setDataCurrency(localCurrencies);
    }
  };

  const getLatest = async () => {
    const localLatest = await localforage.getItem("_LATEST");

    if (localLatest == null) {
      const data = await currencyAPI.getLatest();
      localforage.setItem("_LATEST", data);
      setDataLatest(data as never);
    } else {
      setDataLatest(localLatest);
    }
  };

  const getStatus = async () => {
    const data = await currencyAPI.getStatus();
    setStatusAPI(data);
  };

  const convertNumber = (value) => {
    return value ? parseFloat(value.replace(/,/g, ".")) : 0;
  };

  const calculateFrom = (value) => {
    const to = valueConvert.to || 1;
    const valueTo = parseFloat(
      (
        convertNumber(value) * (to > 0 ? currencySelected.from.value : 0)
      ).toFixed(2)
    );

    setValueConvert({
      to: valueTo > 0 ? valueTo : 0,
    });
  };

  const calculateTo = (value) => {
    const from = valueConvert.from || 1;
    const valueFrom = parseFloat(
      (
        convertNumber(value) * (from > 0 ? currencySelected.from.value : 0)
      ).toFixed(2)
    );

    setValueConvert({
      from: valueFrom > 0 ? valueFrom : 0,
    });
  };

  useEffect(() => {
    getCurrencies();
    getLatest();
  }, []);

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <Box className="w-full h-screen flex-1 bg-slate-800">
        <Header />

        <Box className="relative isolate px-6 pt-14 lg:px-8">
          <Box
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <Box
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[red] to-[blue] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </Box>

          <Box className="mx-auto max-w-2xl sm:py-48 lg:py-56">
            <Box>
              {currencySelected.from.name && currencySelected.to.name && (
                <Box>
                  <Box>
                    {currencySelected.from.symbol} 1{" "}
                    {currencySelected.from.name} é igual a
                  </Box>
                  <Box className="text-5xl">
                    {currencySelected.to.symbol}{" "}
                    {currencySelected.from.value.toFixed(2)}{" "}
                    {currencySelected.to.name_plural}
                  </Box>
                </Box>
              )}

              <Box className="mt-6">
                <Box className="grid grid-cols-[30%_auto] gap-2">
                  <Box>
                    <Input
                      name="valueFrom"
                      placeholder="0,00"
                      className="text-right"
                      value={valueConvert.from}
                      onValueChange={(value) => {
                        setValueConvert({
                          ...valueConvert,
                          from: value as string,
                        });
                        calculateFrom(value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Select
                      onChange={(event) => {
                        const value = event.target.value;
                        if (value !== "") {
                          setCurrencySelected({
                            ...currencySelected,
                            from: {
                              ...dataCurrency.data[value],
                              value: dataLatest.data[value].value,
                            },
                          });
                        } else {
                          setCurrencySelected({
                            ...currencySelected,
                            from: initialCurrency,
                          });
                        }
                      }}
                      name="currencyFrom"
                      defaultValue={""}
                    >
                      {Object.entries(dataCurrency.data).map(
                        ([name, currency], index) => {
                          if (
                            mainCurrencies.indexOf(name) == -1 &&
                            isMainCurrencies
                          ) {
                            return;
                          }
                          return (
                            <option key={index} value={name}>
                              {name} {currency.name_plural}
                            </option>
                          );
                        }
                      )}
                    </Select>
                  </Box>
                </Box>

                <Box className="w-[30%]">
                  <Box className="self-center text-center text-3xl">=</Box>
                </Box>

                <Box className="grid grid-cols-[30%_auto] gap-2">
                  <Box>
                    <Input
                      name="valueTo"
                      placeholder={`${currencySelected.to.symbol} 0,00`}
                      className="text-right"
                      value={valueConvert.to}
                      onValueChange={(value) => {
                        setValueConvert({
                          ...valueConvert,
                          to: value as string,
                        });
                        calculateTo(value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Select
                      name="currencyTo"
                      defaultValue={""}
                      onChange={(event) => {
                        const value = event.target.value;
                        if (value !== "") {
                          setCurrencySelected({
                            ...currencySelected,
                            to: {
                              ...dataCurrency.data[value],
                              value: dataLatest.data[value].value,
                            },
                          });
                        } else {
                          setCurrencySelected({
                            ...currencySelected,
                            to: initialCurrency,
                          });
                        }
                      }}
                    >
                      {Object.entries(dataCurrency.data).map(
                        ([name, currency], index) => {
                          if (
                            mainCurrencies.indexOf(name) == -1 &&
                            isMainCurrencies
                          ) {
                            return;
                          }
                          return (
                            <option key={index} value={name}>
                              {name} {currency.name_plural}
                            </option>
                          );
                        }
                      )}
                    </Select>
                  </Box>
                </Box>
              </Box>

              <Box className="mt-5 grid grid-cols-2 ">
                <Box>
                  <Toggle
                    checked={isMainCurrencies ? true : false}
                    onChange={() => setIsMainCurrencies(!isMainCurrencies)}
                    label="Principais moedas"
                  />
                </Box>
              </Box>

              <Box className="text-center mt-8 text-xs text-stone-100">
                API Requests: {statusAPI.quotas.month.used}/
                {statusAPI.quotas.month.total}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
