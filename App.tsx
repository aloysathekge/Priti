import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface Notes {
  done: boolean;
  title: string;
}

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Notes[]>([]);
  const addNote = () => {
    const newNote: Notes = {
      title: note,
      done: false,
    };
    setNotes((previous) => [...previous, newNote]);
  };
  const toggleDone = () => {};
  const deleteItem = (selectedNote: Notes) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note !== selectedNote));
  };

  const renderNote = ({ item }: { item: Notes }) => {
    return (
      <View style={styles.notesContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && (
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          )}
          {!item.done && <Entypo name="circle" size={32} color="black" />}
          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={() => deleteItem(item)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={note}
          placeholder="Add note"
          onChangeText={(text: string) => setNote(text)}
        />

        <TouchableOpacity
          disabled={note === ""}
          style={styles.button}
          onPress={() => addNote()}
        >
          <Text style={{ fontWeight: "bold" }}> Save</Text>
        </TouchableOpacity>
      </View>
      {notes.length > 0 && (
        <View>
          <FlatList data={notes} renderItem={renderNote} />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginLeft: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    height: 40,
    width: 100,
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
  notesContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "grey",
    padding: 10,
    marginVertical: 4,
  },
});
