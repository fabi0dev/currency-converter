import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Box } from "..";

export default function Header() {
  return (
    <Box className="absolute inset-x-0 top-0 z-50">
      <Box
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Box className="flex lg:flex-1">
          <CurrencyDollarIcon className="h-12 w-12" />

          <h1 className="ml-3 text-4xl font-bold tracking-tight sm:text-3xl self-center">
            Conversor de Moedas
          </h1>
        </Box>
      </Box>
    </Box>
  );
}
