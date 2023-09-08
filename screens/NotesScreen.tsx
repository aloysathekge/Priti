import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NoteCard } from "../NotesCard";
import { RootState, store } from "../store"; // Update the path accordingly
import { Notes } from "../types"; // Import the 'Notes' interface
import { addNote, deleteNote, setNotes, toggleNote } from "../BalanceSlice";
import { v4 as uuidv4 } from "uuid";

export default function NotesScreen() {
  const [note, setNote] = useState("");
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = async () => {
    try {
      const mynotes = await AsyncStorage.getItem("@notes");
      if (mynotes !== null) {
        // value previously stored
        const jsonValue: Notes[] = JSON.parse(mynotes);
        dispatch(setNotes(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.error("error in loading notes ");
    }
  };

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem("@notes", JSON.stringify(notes));
      } catch (error) {
        console.error("Error saving notes:", error);
      }
    };
    saveNotes();
  }, [notes]);

  const addNoteHandler = () => {
    const newNote: Notes = {
      id: uuidv4(),
      title: note,
      done: false,
    };
    dispatch(addNote(newNote));
    console.log(newNote);
    setNote("");
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
          onPress={() => addNoteHandler()}
        >
          <Text style={{ fontWeight: "bold" }}> Save</Text>
        </TouchableOpacity>
      </View>
      {notes.length > 0 && (
        <View>
          <FlatList
            data={notes}
            renderItem={({ item }) => {
              return <NoteCard item={item} />;
            }}
          />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  form: {
    marginVertical: 20,
    padding: 15,
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
    flex: 1,
    marginLeft: 12,
    alignSelf: "flex-end",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    padding: 10,
  },
});
