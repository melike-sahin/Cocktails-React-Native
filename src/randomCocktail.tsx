import { Urls } from "../services/urls";
import CommonCocktail from "./common/commonCocktail";

const RandomCocktail = (): JSX.Element => {
    return <CommonCocktail url={Urls.RandomCocktailUrl} />
}

export default RandomCocktail;

