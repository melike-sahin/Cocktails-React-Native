import { Cocktail } from "./datatypes";
import { Urls } from "./urls";

export const getCocktailsFromApiAsync = async (url: Urls, parameter?: string) => {
    try {
        const response = await fetch(
            parameter ? url + parameter : url
        );
        const json = await response.json();
        if (url === Urls.RandomCocktailUrl || url === Urls.IdCocktailUrl) return randomOrIdResponseToCocktail(json);
        if (url === Urls.SearchCocktailUrl) return searchResponseToCocktail(json);
        return json;
    } catch (error) {
        return 'No data available';
    }
};

const randomOrIdResponseToCocktail = (apiReturn: any): Cocktail => {
    const ingredientsArray: string[] = [];
    (Object.entries(apiReturn.drinks[0])).map(([key, value]) => { if (key.includes('strIngredient') && value !== null && value !== '') ingredientsArray.push(value as string) });
    const cocktail: Cocktail = {
        cocktailId: apiReturn.drinks[0].idDrink,
        cocktailName: apiReturn.drinks[0].strDrink,
        cocktailImageLink: apiReturn.drinks[0].strDrinkThumb,
        cocktailIngredients: ingredientsArray,
    }
    return cocktail;
}

const searchResponseToCocktail = (apiReturn: any): Cocktail[] => {
    return apiReturn.drinks.reduce((acc: any, val: any) => [
        ...acc,
        { cocktailId: val.idDrink, cocktailName: val.strDrink } as Cocktail
    ], []);
}