import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { searchMeals } from './src/services/mealAPI';
import { addFavorite, getFavorites } from './src/services/dbServices';

export default function App() {
  useEffect(() => {
    const controller = new AbortController();

    async function probar() {
      try {
        const meals = await searchMeals('chicken', controller.signal);
        if (meals.length > 0) {
          await addFavorite(meals[0]);
        }
        const favoritos = await getFavorites();
        console.log(favoritos.map((f) => f.name));
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      }
    }

    probar();
    return () => controller.abort();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Mira la consola</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
