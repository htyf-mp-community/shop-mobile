import Button from "../../components/Button/Button";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function SignOut() {
  const { RemoveUser } = useUser();
  const [tapped, setTapped] = useState(0);

  async function onSignOut() {
    if (tapped >= 1) {
      RemoveUser();
    }
    setTapped(tapped + 1);
  }

  return (
    <Button
      callback={onSignOut}
      variant="primary"
      text={tapped === 1 ? "Are you sure?" : "SIGN OUT"}
      style={{
        borderWidth: 1,
        borderColor: "red",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "center",
      }}
    />
  );
}
