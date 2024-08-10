import {SrCriterion} from "./sr-criterion";
import {SrOperators} from "./sr-operators";
import {isNullOrUndefined} from "../../utils";



export class SrSkip extends SrCriterion {
    private number: number;

    constructor(value: number) {
        super();
        this.number = value;
    }

    build(): string {
        if (isNullOrUndefined(this.number)) return null;
        return SrOperators.SKIP + "=" + this.number;
    }
}

export function $skip(value: number): SrSkip {
    return new SrSkip(value);
}
