import { Button, IconButton, Modal } from "components";
import { Colors } from "constants/styles";
import { image } from "functions/image";
import useWatchlist from "modules/AddWatchlist/useWatchlist";
import { View, Image, Text } from "react-native";
import { ProductMinified } from "/@types/types";

import { Feather } from "@expo/vector-icons";

interface PreviewModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
  selectedProduct: ProductMinified | null;
}

export default function PreviewModal({
  closeModal,
  isModalVisible,
  selectedProduct,
}: PreviewModalProps) {
  const { appendWatchlist: add, remove } = useWatchlist(
    selectedProduct?.prod_id! || 0,
    { withCheck: false }
  );

  const handleRemoveProduct = async () => {
    if (selectedProduct?.prod_id) {
      await remove(selectedProduct.prod_id);
      closeModal();
    }
  };

  return (
    <Modal
      animationInTiming={100}
      animationOut="slideOutDown"
      animationIn="slideInUp"
      isVisible={isModalVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={{ padding: 10, borderRadius: 12.5 }}
    >
      <Image
        source={image(selectedProduct?.img_id)}
        style={{
          width: "100%",
          height: 250,
          borderRadius: 5,
        }}
      />

      <View style={{ padding: 10 }}>
        <Text
          style={{
            color: Colors.text,
            fontSize: 24,
            marginVertical: 5,
            fontWeight: "bold",
          }}
        >
          {selectedProduct?.title}
        </Text>

        <Text style={{ color: Colors.text, fontSize: 25, fontWeight: "bold" }}>
          ${selectedProduct?.price}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            marginBottom: 5,
            justifyContent: "flex-end",
          }}
        >
          <Button
            // onPress={() => add()}
            color="primary"
            type="contained"
            fontStyle={{ fontSize: 15 }}
            style={{ flexDirection: "row-reverse", marginLeft: 10 }}
            icon={
              <Feather
                style={{ marginRight: 10 }}
                name="shopping-bag"
                size={20}
                color="white"
              />
            }
            text="ADD CART"
          />

          <IconButton
            onPress={handleRemoveProduct}
            containerStyle={{
              backgroundColor: Colors.error,
            }}
            icon={<Feather name="trash" size={24} color="white" />}
          />
        </View>
      </View>
    </Modal>
  );
}
