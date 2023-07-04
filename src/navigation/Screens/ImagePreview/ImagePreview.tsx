import ScreenContainer from "components/ui/ScreenContainer";

import { ScreenNavigationProps } from "/@types/types";

import { ScrollView } from "react-native-gesture-handler";

import { GesturedImage } from "../ProductDetails/components/ImagesModal";

export default function ImagePreviewScreen({
  route,
}: ScreenNavigationProps<"ImagePreview">) {
  return (
    <ScreenContainer>
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {route.params.images.map((img, index) => (
          <GesturedImage key={img.id} index={index} name={img.name} />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
