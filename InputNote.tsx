import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
interface InputProps {
  isVisible: boolean;
  onClose: () => void;
}
export function InputNote({ prop }: { prop: InputProps }) {
  return <Modal></Modal>;
}

const styles = StyleSheet.create({
  modalConatiner: {},

  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    borderRadius: 10,
    height: "50%",
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },

  footer: {
    marginStart: 30,
  },
});
