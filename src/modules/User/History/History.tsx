import { ENDPOINTS } from "../../../constants/routes";
import { StyleSheet } from "react-native";
import React from "react";
import ProductsCarusel from "../../ProductsCarusel/ProductsCarusel";

interface HistoryProps {}

export default function History({}: HistoryProps): JSX.Element {
  return (
    <ProductsCarusel
      title="Last purchases"
      sharedID="History"
      path={ENDPOINTS.history}
      refresh={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});
