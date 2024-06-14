import axios from 'axios';

// Nutritionix API
const nutritionixAppId = 'e446cbcc';
const nutritionixApiKey = '0f529d785646b97a3cb91118071baf3a';

// DeepL API
const deepLApiKey = '6c6f1c9d-eaf4-407d-a55a-e99d0b2f0561:fx';

// Fonction de traduction avec DeepL
const translate = async (text, targetLang) => {
  const url = 'https://api-free.deepl.com/v2/translate';
  try {
    const response = await axios.post(url, new URLSearchParams({
      auth_key: deepLApiKey,
      text: text,
      target_lang: targetLang
    }));
    return response.data.translations[0].text;
  } catch (error) {
    console.error('Erreur de traduction:', error);
    return text;
  }
};

// Obtenir des informations nutritionnelles sur un aliment
export const getNutritionInfo = async (foodItem) => {
  const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
  try {
    const translatedFoodItem = await translate(foodItem, 'EN'); // Traduire en anglais avant d'envoyer à Nutritionix
    const response = await axios.post(url, { query: translatedFoodItem }, {
      headers: {
        'x-app-id': nutritionixAppId,
        'x-app-key': nutritionixApiKey,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data;
    if (!data || !data.foods) {
      throw new Error('Données nutritionnelles non disponibles');
    }
    const info = data.foods.map(food =>
      `${food.food_name}: ${food.nf_calories} calories, ${food.nf_total_fat}g de matières grasses, ${food.nf_protein}g de protéines`
    ).join('\n');
    const translatedInfo = await translate(info, 'FR'); // Traduire les résultats en français
    return translatedInfo;
  } catch (error) {
    console.error('Erreur lors de l\'obtention des informations nutritionnelles:', error);
    return 'Désolé, je n\'ai pas pu obtenir les informations nutritionnelles.';
  }
};

// Obtenir des informations sur les calories d'un aliment
export const fetchCaloriesInfo = async (query) => {
  const foodItem = query.split(' ').slice(1).join(' ');
  return await getNutritionInfo(foodItem);
};

// Obtenir des informations sur les nutriments d'un aliment
export const fetchNutrientsInfo = async (query) => {
  const foodItem = query.split(' ').slice(1).join(' ');
  return await getNutritionInfo(foodItem);
};

// Wger API

// Obtenir des informations sur un exercice spécifique
export const getExerciseInfo = async (exerciseId) => {
  const url = `https://wger.de/api/v2/exercise/${exerciseId}/`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    const translatedDescription = await translate(data.description, 'FR');
    const info = `${data.name}: ${translatedDescription}`;
    return info;
  } catch (error) {
    console.error('Erreur lors de l\'obtention des informations sur l\'exercice:', error);
    return 'Désolé, je n\'ai pas pu obtenir les informations sur l\'exercice.';
  }
};

// Obtenir des informations sur un exercice cardio
export const fetchCardioInfo = async (query) => {
  const exerciseId = query.split(' ')[1];
  return await getExerciseInfo(exerciseId);
};

// Obtenir des informations sur un exercice de musculation
export const fetchStrengthInfo = async (query) => {
  const exerciseId = query.split(' ')[1];
  return await getExerciseInfo(exerciseId);
};

// Spoonacular API
const spoonacularApiKey = 'b3d63b30a417478f8f2e817fe18cf6dc';

// Obtenir des informations sur une recette spécifique
export const getRecipeInfo = async (recipeId) => {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${spoonacularApiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    const translatedInstructions = await translate(data.instructions, 'FR');
    const info = `${data.title}: ${data.readyInMinutes} minutes, ${data.servings} portions. Instructions: ${translatedInstructions}`;
    return info;
  } catch (error) {
    console.error('Erreur lors de l\'obtention des informations sur la recette:', error);
    return 'Désolé, je n\'ai pas pu obtenir les informations sur la recette.';
  }
};

// Obtenir des informations sur les ingrédients d'une recette
export const fetchRecipeIngredients = async (query) => {
  const recipeId = query.split(' ')[1];
  return await getRecipeInfo(recipeId);
};

// Obtenir des informations sur les étapes de préparation d'une recette
export const fetchRecipeSteps = async (query) => {
  const recipeId = query.split(' ')[1];
  return await getRecipeInfo(recipeId);
};

// Dispatcher les requêtes vers les fonctions appropriées en fonction du bot actif et de la commande
export const fetchSportData = async (query, botName) => {
  if (botName === 'Nutrition') {
    if (query.toLowerCase().includes('nutrition')) {
      const foodItem = query.split(' ').slice(1).join(' ');
      return await getNutritionInfo(foodItem);
    }
  } else if (botName === 'Exercice') {
    if (query.toLowerCase().includes('exercice')) {
      const exerciseId = query.split(' ')[1];
      return await getExerciseInfo(exerciseId);
    }
  } else if (botName === 'Recette') {
    if (query.toLowerCase().includes('recette')) {
      const recipeId = query.split(' ')[1];
      return await getRecipeInfo(recipeId);
    }
  }
  return 'Je ne comprends pas cette commande. Essayez de demander des informations sur la nutrition, l\'exercice ou les recettes.';
};
