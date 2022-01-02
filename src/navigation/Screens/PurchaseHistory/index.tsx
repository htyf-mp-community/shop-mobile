import React from "react";

import { View } from "react-native";
import History from "../../../modules/User/History/History";

/* TODO:
 * Make it look like x-kom mobile app purchase history
 */

export default function PurchaseHistory() {
  return (
    <View style={{ flex: 1 }}>
      <History />
    </View>
  );
}
