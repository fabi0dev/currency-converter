import { useCallback, useEffect, useState } from "react";
import { Box, Header, Input, Select, Toggle } from "../../components";
import currencyAPI from "../../services/currencyAPI";
import localforage from "localforage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorCurrencySelect,
  setCurrencyFromSelect,
  setCurrencyToSelect,
} from "../../store/reducers/currencySelect";
import { selectorLatest, setLatest } from "../../store/reducers/latest";
import PolygonsUI from "./polygonsUI";

import * as Icon from "@heroicons/react/24/outline";

interface IValueConvert {
  from?: number;
  to?: number;
}

export default function Home() {
  const dispatch = useDispatch();
  const currencySelect = useSelector(selectorCurrencySelect);
  const latest = useSelector(selectorLatest);

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

  const getLatest = useCallback(
    async (baseCurrency: string, fn: (data: any) => void) => {
      const dataLatest = await currencyAPI.getLatest(baseCurrency);
      const data = dataLatest.data;

      dispatch(
        setLatest({
          data,
        })
      );

      fn(data);
    },
    [dispatch]
  );

  const getStatus = async () => {
    const data = await currencyAPI.getStatus();
    setStatusAPI(data);
  };

  const convertNumber = (value: string) => {
    if (typeof value == "string") {
      return value ? parseFloat(value.replace(/,/g, ".")) : 0;
    }

    return value;
  };

  const calculateFrom = (value: string) => {
    const to = valueConvert.to || 1;

    const valueTo = parseFloat(
      (convertNumber(value) * (to > 0 ? currencySelect.to.value : 0)).toFixed(2)
    );

    setValueConvert({
      from: value,
      to: valueTo > 0 ? valueTo : 0,
    });
  };

  const calculateTo = (value: string) => {
    const from = valueConvert.from || 1;
    let valueFrom = 0;

    if (currencySelect.to.value < 1) {
      const valueUn = 100 / (currencySelect.to.value * 100);
      valueFrom = parseFloat((convertNumber(value) * valueUn).toFixed(2));
    } else {
      if (currencySelect.to.value > currencySelect.from.value) {
        const valueUn = 100 / (currencySelect.to.value * 100);
        valueFrom = parseFloat((convertNumber(value) * valueUn).toFixed(2));
      } else {
        valueFrom = parseFloat(
          (
            convertNumber(value) * (from > 0 ? currencySelect.to.value : 0)
          ).toFixed(2)
        );
      }
    }

    setValueConvert({
      to: value,
      from: valueFrom > 0 ? valueFrom : 0,
    });
  };

  const updateValueTo = (value: string) => {
    const valueFrom = valueConvert.from || 1;

    const valueTo = parseFloat(
      (convertNumber(value) * (valueFrom > 0 ? valueFrom : 0)).toFixed(2)
    );

    setValueConvert({
      ...valueConvert,
      to: valueTo > 0 ? valueTo : 0,
    });
  };

  const getComparePercent = () => {
    let percent = "0";
    let negative = false;

    if (currencySelect.from.value > currencySelect.to.value) {
      const calc =
        100 - (currencySelect.to.value * 100) / currencySelect.from.value;
      percent = `${calc.toFixed(2)}%`;
      negative = true;
    } else {
      const calc = (currencySelect.to.value * 100) / currencySelect.from.value;
      percent = `${calc.toFixed(2)}%`;
    }

    if (percent == "100.00%") {
      percent = "";
    }

    return {
      percent,
      negative,
    };
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    getStatus();
  }, [currencySelect]);

  return (
    <>
      <Box className="w-full h-screen flex-1 bg-slate-800">
        <Header />

        <Box className="relative isolate px-6 pt-14 lg:px-8">
          <PolygonsUI />

          <Box className="mx-auto max-w-2xl sm:py-48 lg:py-56">
            <Box>
              {currencySelect.from.name && currencySelect.to.name && (
                <Box>
                  <Box>
                    {currencySelect.from.symbol} 1 {currencySelect.from.name} é
                    igual a
                  </Box>
                  <Box className="text-5xl flex">
                    {currencySelect.to.symbol}{" "}
                    {currencySelect.to.value.toFixed(2)}{" "}
                    {currencySelect.to.name_plural}
                    <Box className="flex">
                      {!getComparePercent().negative && (
                        <Icon.ArrowUpIcon
                          className="h-6 w-6 text-red-500"
                          stroke="#4caf50"
                        />
                      )}

                      {getComparePercent().negative && (
                        <Icon.ArrowDownIcon
                          className="h-6 w-6 text-red-500"
                          stroke="#f44336"
                        />
                      )}
                      <Box className="text-xs">
                        {getComparePercent().percent}
                      </Box>
                    </Box>
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
                        calculateFrom(value as string);
                      }}
                      autoComplete={"off"}
                    />
                  </Box>
                  <Box>
                    <Select
                      onChange={(event) => {
                        const value = event.target.value;

                        getLatest(value, (latestData) => {
                          dispatch(
                            setCurrencyFromSelect({
                              ...dataCurrency.data[value],
                              value: latestData[value].value,
                            })
                          );
                        });
                      }}
                      name="currencyFrom"
                      value={currencySelect.from.code}
                    >
                      {currencySelect.from.code == "" && (
                        <option key={9999999} value={""}>
                          Selecione uma opção
                        </option>
                      )}
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
                      placeholder={`${currencySelect.to.symbol} 0,00`}
                      className="text-right"
                      value={valueConvert.to}
                      onValueChange={(value) => {
                        calculateTo(value as string);
                      }}
                      disabled={currencySelect.to.code == "" ? true : false}
                      autoComplete={"off"}
                    />
                  </Box>
                  <Box>
                    <Select
                      onChange={(event) => {
                        const value = event.target.value;

                        dispatch(
                          setCurrencyToSelect({
                            ...dataCurrency.data[value],
                            value: latest.data[value].value,
                          })
                        );

                        updateValueTo(latest.data[value].value);
                      }}
                      name="currencyTo"
                      value={currencySelect.to.code}
                    >
                      {currencySelect.to.code == "" && (
                        <option key={9999999} value={""}>
                          Selecione uma opção
                        </option>
                      )}
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

              <Box className="fixed bottom-3 right-3 text-center mt-8 text-xs text-stone-200">
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
