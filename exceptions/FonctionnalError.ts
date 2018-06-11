

// Error that can be displayed to User
export class FunctionnalError extends Error
{
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        //Useful? Object.setPrototypeOf(this, FunctionalError.prototype);
    }
}

