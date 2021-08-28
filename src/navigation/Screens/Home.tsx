import {
  Keyboard,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SearchBar from "../../modules/Searchbar/SearchBar";
import { Colors } from "../../constants/styles";
import Overlay from "../../components/Overlay/Overlay";
import { useState } from "react";
import ProductsCarusel from "../../modules/ProductsCarusel/ProductsCarusel";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import { useCallback } from "react";

export const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const { user } = useUser();

  const close = () => {
    setShowOverlay(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/products/search-history`, {
          headers: {
            token: user.token,
          },
        });
        if (data !== null && data !== undefined) {
          setSearchHistory(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const open = (callback: () => void) => {
    setShowOverlay(true);
    callback();
  };

  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => {
      setRefresh(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar open={open} close={close} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }
      >
        <ProductsCarusel
          path="/products/good-rated"
          title="Best Rated"
          sharedID="MostSearched"
          refresh={refresh}
        />
        <ProductsCarusel
          path="/products/searched-products"
          title="Your searches"
          sharedID="WatchedByYou"
          refresh={refresh}
        />
        <ProductsCarusel
          path="/products"
          title="All products"
          sharedID="All"
          refresh={refresh}
        />
      </ScrollView>

      {showOverlay && (
        <Overlay close={close}>
          {/*  <ScrollView style={{ marginTop: 100 }}>
            {searchHistory.map(({ word, id, date }) => {
              return (
                <View
                  key={id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>{word}</Text>
                  <Text style={styles.text}>{date}</Text>
                </View>
              );
            })}
          </ScrollView> */}
        </Overlay>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  text: {
    color: "white",
    fontFamily: "PoppinsRegular",
    padding: 20,
  },
  scrollView: {},
});
