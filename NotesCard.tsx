import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import { Notes } from "./types";
import { toggleNote, deleteNote, editNote } from "./BalanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store";
import React from "react";

export interface Props {
  item: Notes;
}

const NoteCard = React.memo(({ item }: Props) => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);
  let noteContent;
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  if (isEditing) {
    noteContent = (
      <View>
        <TextInput
          style={styles.input}
          value={item.title}
          onChangeText={(text: string) =>
            dispatch(editNote({ ...item, title: text }))
          }
        />
      </View>
    );
  } else {
    noteContent = (
      <View>
        <Text style={styles.todoText}>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.notesContainer}>
      <TouchableOpacity
        onPress={() => dispatch(toggleNote(item.id))}
        style={styles.todo}
      >
        {item.done && (
          <Ionicons name="md-checkmark-circle" size={32} color="green" />
        )}
        {!item.done && <Entypo name="circle" size={32} color="black" />}
        {noteContent}
      </TouchableOpacity>
      {isEditing ? (
        <Button title="save" onPress={() => setIsEditing(false)} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <FontAwesome
            style={{ marginRight: 10 }}
            name="edit"
            size={24}
            color="green"
            onPress={() => setIsEditing(true)}
          />

          <Ionicons
            name="trash-bin-outline"
            size={24}
            color="red"
            onPress={() => dispatch(deleteNote(item.id))}
          />
        </View>
      )}
    </View>
  );
});
export default NoteCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  todo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    margin: 5,
    backgroundColor: "#fff",
  },
  notesContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "grey",
    padding: 10,
    marginVertical: 4,
  },
});
