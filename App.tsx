import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import NotesScreen from "./screens/NotesScreen";
import { store } from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <NotesScreen />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({});
