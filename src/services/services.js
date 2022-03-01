import axios from "axios";

export const getRecipes = async({dish, vegan}) => {
  try {
    const respuesta = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${dish}&addRecipeInformation=true`, {
      params: {
        apiKey: '6ce9458e4ce140b1886e0829b12576ec',
        diet: vegan ? 'vegan' : ''
      }
    });
    if(respuesta.status === 200) {
      // console.log(respuesta)
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
    const respuesta = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information`);
    if(respuesta.status === 200) {
      // console.log(respuesta)
      return respuesta
    }
  } catch(error) {
    console.log(error)
    return error
  }}
}