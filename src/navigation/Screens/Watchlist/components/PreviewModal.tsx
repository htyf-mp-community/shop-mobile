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

  return (
    <Modal
      animationInTiming={100}
      animationOut="slideOutDown"
      animationIn="slideInUp"
      isVisible={isModalVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={{ padding: 0, borderRadius: 0 }}
    >
      <Image
        source={image(selectedProduct?.img_id)}
        style={{
          width: "100%",
          height: 250,
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
          {/* <Button
            onPress={() => add()}
            fontStyle={{ fontSize: 15 }}
            text="ADD TO CART"
            type="contained"
            color="primary"
            style={{ marginRight: 10, paddingHorizontal: 15 }}
          />
          <Button
            onPress={() => remove(selectedProduct!.prod_id)}
            fontStyle={{ fontSize: 15 }}
            text="UNFOLLOW"
            type="contained"
            style={{ paddingHorizontal: 15, backgroundColor: Colors.error }}
          /> */}

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
            onPress={() => remove(selectedProduct!.prod_id)}
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
