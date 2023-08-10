import { Modal, StyleSheet, Text, View } from "react-native";
export interface Notes {
  title: string;
  text: string;
  created: boolean;
}

export function Notes({ note }: { note: Notes }) {
  return (
    <Modal>
      <View></View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
