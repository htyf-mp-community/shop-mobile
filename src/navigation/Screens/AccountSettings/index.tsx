import axios from "axios";
import React, { useState } from "react";
import { View } from "react-native";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { Colors } from "../../../constants/styles";

async function changeEmail(token: string) {
  try {
    const {} = await axios.post("");
  } catch (error) {}
}
async function changePassword(token: string) {
  try {
    const {} = await axios.post("");
  } catch (error) {}
}

export default function AccountSettings() {
  const [email, setEmail] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <Input
        keyboardType="email-address"
        name="Change e-mail"
        value={email}
        setValue={setEmail}
        placeholder={"New e-mail"}
        placeholderColor="#fff"
        style={{ color: "#fff" }}
        labelStyle={{ color: "#fff" }}
      />
      <Input
        keyboardType="email-address"
        name="Repeat email"
        value={email}
        setValue={setEmail}
        placeholder={"New e-mail"}
        placeholderColor="#fff"
        style={{ color: "#fff" }}
        labelStyle={{ color: "#fff" }}
      />

      <Button
        text="CHANGE EMAIL"
        style={{ margin: 20, padding: 15 }}
        callback={async () => await changeEmail("")}
      />
    </View>
  );
}
