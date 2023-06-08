import { Urls } from "../services/urls";
import CommonCocktail from "./common/commonCocktail";

const IdCocktail = ({ route }: { route: any }): JSX.Element => {
    const { cocktailId } = route.params;

    return (
        <>
            {cocktailId && <CommonCocktail url={Urls.IdCocktailUrl} cocktailId={cocktailId} />}
        </>
    )
}

export default IdCocktail;