import React, { createContext, useContext, useState } from "react";

interface PersonalContextProps {
  phone: number;
  setPhone: (_: any) => void;
  card: string;
  setCard: (_: any) => void;
  address: {
    city: string;
    setCity: (_: any) => void;
    setNumber: (_: any) => void;
    setStreet: (_: any) => void;
    number: string;
    street: string;
  };
}

const PersonalsContext = createContext<PersonalContextProps>({
  phone: 0,
  setPhone: (_: any) => {},
  card: "",
  setCard: (_: any) => {},
  address: {
    city: "",
    setCity: (_: any) => {},
    setNumber: (_: any) => {},
    setStreet: (_: any) => {},
    number: "",
    street: "",
  },
});

export function usePersonalContext() {
  return useContext(PersonalsContext);
}

export default function PersonalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phone, setPhone] = useState(0);
  const [card, setCard] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  return (
    <PersonalsContext.Provider
      value={{
        phone,
        setPhone,
        card,
        setCard,
        address: {
          city,
          setCity,
          setNumber,
          setStreet,
          number,
          street,
        },
      }}
    >
      {children}
    </PersonalsContext.Provider>
  );
}
