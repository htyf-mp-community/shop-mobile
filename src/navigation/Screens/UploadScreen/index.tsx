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
      <Modal isVisible={state.finished}>
        <Text style={{ color: "#fff", fontSize: 25 }}>Product uploaded</Text>
        <Text style={{ color: "#fff", fontSize: 25 }}>id: </Text>
        
      </Modal>

      <ModalLoader isVisible={state.loading} />
      <Form
        onSubmit={upload as any}
        disabled={!state.clicked || state.loading}
      />
    </Container>
  );
}
