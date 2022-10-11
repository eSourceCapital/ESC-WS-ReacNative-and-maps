import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { createTables, createTask, getTaskList } from "./utils/db";

export default function App() {
  useEffect(function () {
    async function init() {
      await createTables();
      // await createTask(1,false, 19.1, 15.2)
      // const tasks = await getTaskList();
      // console.log(tasks);
    }
    init();
  }, []);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
