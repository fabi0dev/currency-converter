import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Box } from "..";

export default function Header() {
  return (
    <Box className="sm:absolute inset-x-0 top-0 z-50">
      <Box
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Box className="flex lg:flex-1">
          <CurrencyDollarIcon stroke="#eee" className="h-12 w-12" />

          <h1 className="ml-3 text-2xl font-bold tracking-tight xl:text-4xl sm:text-4xl self-center">
            Conversor de Moedas
          </h1>
        </Box>
      </Box>
    </Box>
  );
}
