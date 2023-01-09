import { Button, Container } from "components";
import { useState } from "react";
import Form from "./components/Form";
import { ScreenNavigationProps } from "/@types/types";
import useUploadProducts from "./hooks/useUploadProducts";

export default function UploadScreen({}: ScreenNavigationProps<"Upload">) {
  const { handleUploadFinalAsync: upload, state } = useUploadProducts();

  return (
    <Container centerVertical>
      <Form
        onSubmit={upload as any}
        disabled={state.clicked || state.loading}
      />
    </Container>
  );
}
