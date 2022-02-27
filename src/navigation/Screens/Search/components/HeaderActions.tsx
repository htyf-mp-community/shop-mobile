import { Header, Button } from "components";
import { Colors } from "constants/styles";

interface HeaderActionProps {
  onSheetOpen: () => void;
}

export default function HeaderActions({ onSheetOpen }: HeaderActionProps) {
  return (
    <Header>
      <Button
        onPress={onSheetOpen}
        text="Filters"
        style={{ backgroundColor: Colors.primary, padding: 5 }}
        fontStyle={{ color: "#00D85D" }}
      />
    </Header>
  );
}
