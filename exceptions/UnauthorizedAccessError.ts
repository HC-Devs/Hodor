import { FunctionnalError } from "./FonctionnalError";

export class UnauthorizedAccessError extends FunctionnalError
{
    public static ERROR_MSG: string = "Vous n'avez pas les autorisations nécessaires pour exécuter cette commande.";

    constructor(m: string = UnauthorizedAccessError.ERROR_MSG) {
        super(m);
    }
}

