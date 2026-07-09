import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ConversionContextValue = {
  converted: boolean;
  markConverted: () => void;
};

const ConversionContext = createContext<ConversionContextValue | null>(null);

export function ConversionProvider({ children }: { children: ReactNode }) {
  const [converted, setConverted] = useState(false);
  const markConverted = useCallback(() => setConverted(true), []);

  return (
    <ConversionContext.Provider value={{ converted, markConverted }}>
      {children}
    </ConversionContext.Provider>
  );
}

export function useConversion() {
  const ctx = useContext(ConversionContext);
  if (!ctx) {
    throw new Error("useConversion must be used within ConversionProvider");
  }
  return ctx;
}
