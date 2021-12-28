import React, { createContext, useContext, useState } from "react";

interface PersonalContextProps {
  phone: string;
  setPhone: (phone: string) => void;
  card: string;
  setCard: (card: string) => void;
  address: {
    city: string;
    setCity: (city: string) => void;
    setNumber: (nr: string) => void;
    setStreet: (street: string) => void;
    number: string;
    street: string;
  };
}

const PersonalsContext = createContext<PersonalContextProps>({
  phone: "",
  setPhone: (phone: string) => {},
  card: "",
  setCard: (card: string) => {},
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
  const [phone, setPhone] = useState("000-000-000");
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
