import { Button, Container } from "components";
import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";

export default function UploadScreen() {
  const [step, setStep] = useState(1); // 1-4
  return (
    <Container centerVertical>
      <Header step={step} />
      <Form onSubmit={() => new Promise(() => {})} />
    </Container>
  );
}
