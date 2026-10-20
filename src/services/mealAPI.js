const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export function mapMeal(row) {
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const name = (row[`strIngredient${i}`] ?? '').trim();
    if (name) {
      ingredientes.push({
        name,
        measure: (row[`strMeasure${i}`] ?? '').trim(),
      });
    }
  }
  return {
    idMeal: row.idMeal,
    name: row.strMeal,
    category: row.strCategory,
    area: row.strArea,
    instructions: row.strInstructions,
    thumbnail: row.strMealThumb,
    ingredientes,
  };
}

export async function searchMeals(text, signal) {
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(text)}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }
  const data = await response.json();
  return (data.meals ?? []).map(mapMeal);
}

export async function getMealById(id, signal) {
  const url = `${BASE_URL}/lookup.php?i=${id}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }
  const data = await response.json();
  return data.meals ? mapMeal(data.meals[0]) : null;
}
