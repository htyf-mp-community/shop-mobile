import { Container, Modal } from "components";
import Form from "./components/Form";
import { ScreenNavigationProps } from "/@types/types";
import useUploadProducts from "./hooks/useUploadProducts";
import ModalLoader from "components/ui/ModalLoader";
import { Text } from "react-native";

export default function UploadScreen({}: ScreenNavigationProps<"Upload">) {
  const { handleUploadFinalAsync: upload, state } = useUploadProducts();

  return (
    <Container centerVertical>
      <ModalLoader isVisible={state.loading} />
      <Form
        onSubmit={upload as any}
        disabled={!state.clicked || state.loading}
      />
    </Container>
  );
}
