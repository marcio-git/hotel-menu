import axios from "axios";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  baseUrl: process.env.REACT_APP_BASE_URL,
};

export const getRecipes = async({dish, vegan}) => {
  try {
    const respuesta = await axios.get(`${config.baseUrl}/recipes/complexSearch?query=${dish}&addRecipeInformation=true`, {
      params: {
        apiKey: config.apiKey,
        diet: vegan ? 'vegan' : ''
      }
    });
    if(respuesta.status === 200) {
      return respuesta
    }
  } catch(error) {
    console.log(error)
    return error
  }
}
export const getRecipesDetail = async(idRecipe) => {
  // console.log(idRecipe)
  if(idRecipe) {
  try {
    const respuesta = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information`, {
      params: {
        apiKey: config.apiKey,
      }
    });
    if(respuesta.status === 200) {
      // console.log(respuesta)
      return respuesta
    }
  } catch(error) {
    console.log(error)
    return error
  }}
}