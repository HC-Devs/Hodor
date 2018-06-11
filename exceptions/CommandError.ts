import { FunctionnalError } from "./FonctionnalError";

export class CommandError extends FunctionnalError
{
    public static ERROR_MSG: string = "Erreur de saisie dans la commande. Merci d'utiliser la syntaxe suivante:\n";

    constructor( cmdUsage: string,m: string = CommandError.ERROR_MSG) {
        super(m + cmdUsage);
    }

}