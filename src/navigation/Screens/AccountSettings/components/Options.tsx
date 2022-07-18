import { useAppSelector } from "utils/hooks/hooks";
import Block from "./Block";
import type { CurrentOptionType } from "../index";

interface OptionProps {
  onSheetOpen: (variant: CurrentOptionType) => void;
}

export default function Options({ onSheetOpen }: OptionProps) {
  const { name, surname, phone_number, address } = useAppSelector(
    (state) => state.user.credentials
  );
  return (
    <>
      <Block text={name} label="Name" onPress={() => onSheetOpen("NAME")} />
      <Block
        text={surname}
        label="Surname"
        onPress={() => onSheetOpen("SURNAME")}
      />
      <Block
        text={address}
        label="Address"
        onPress={() => onSheetOpen("ADDRESS")}
      />
      <Block
        text={phone_number}
        label="Phone number"
        onPress={() => onSheetOpen("PHONE_NUMBER")}
      />
    </>
  );
}
