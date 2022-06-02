import { Container } from "components";

import { Text } from "react-native";
import Form from "./components/Form/Form";

export default function UploadScreen() {
  return (
    <Container centerVertical>
      <Form onSubmit={() => new Promise(() => {})} />
    </Container>
  );
}
