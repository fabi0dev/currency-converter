import { useEffect, useState } from "react";
import { Box, Header, Input, Select } from "../../components";

export default function Home() {
  const [valueConvert, setValueConvert] = useState({
    from: "0,00",
    to: "0,00",
  });

  useEffect(() => {
    console.log("ok");
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
              <Box className="">1 Dólar americano é igual a</Box>
              <Box className="text-5xl">0,99 Euros</Box>
              <Box className="mt-6">
                <Box className="grid grid-cols-[30%_auto] gap-2">
                  <Box>
                    <Input
                      prefix={"$ "}
                      placeholder="0,00"
                      className="text-right"
                      value={valueConvert.from}
                    />
                  </Box>
                  <Box>
                    <Select>
                      <option value={"teste"}>BRL</option>
                      <option value={"teste"}>EUR</option>
                      <option value={"teste"}>DLR</option>
                    </Select>
                  </Box>
                </Box>
                <Box className="w-[30%]">
                  <Box className="self-center text-center text-3xl">=</Box>
                </Box>
                <Box className="grid grid-cols-[30%_auto] gap-2">
                  <Box>
                    <Input
                      prefix={"$ "}
                      placeholder="0,00"
                      className="text-right"
                      value={valueConvert.to}
                    />
                  </Box>
                  <Box>
                    <Select>
                      <option value={"teste"}>BRL</option>
                      <option value={"teste"}>EUR</option>
                      <option value={"teste"}>DLR</option>
                    </Select>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
