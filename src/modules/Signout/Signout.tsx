import Button from "../../components/Button/Button";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function SignOut() {
  const { RemoveUser } = useUser();
  const [tapped, setTapped] = useState(0);

  async function SignOut() {
    setTapped(tapped + 1);
    if (tapped > 1) {
      RemoveUser();
    }
  }

  return (
    <Button
      callback={SignOut}
      text={tapped === 1 ? "Are you sure?" : "Signout"}
      style={{
        backgroundColor: "transparent",
        color: "red",
        borderWidth: 1,
        borderColor: "red",
        marginTop: 20,
        marginBottom: 20,
      }}
    />
  );
}
