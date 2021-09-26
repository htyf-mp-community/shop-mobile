import axios from "axios";
import { ENDPOINTS } from "../../../constants/routes";
import { useUser } from "../../../context/UserContext";
import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import Product from "../../Product/Product";

interface HistoryProps {}

export default function History({}: HistoryProps): JSX.Element {
  const {
    user: { token },
  } = useUser();

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(ENDPOINTS.history, {
          headers: {
            token: token,
          },
        });

        setHistory(data);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, [token]);

  return (
    <ScrollView style={styles.container} horizontal pagingEnabled>
      {history.map((el, i) => {
        return <Product key={i} {...el} sharedID=".history" />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
