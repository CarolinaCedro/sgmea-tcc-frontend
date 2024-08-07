// utils.ts
export function isNullOrUndefined(...value: any[]): boolean {
    if (value === null || value === undefined) return true;
    let result = true;
    for (let i = 0; i < value.length; i++) {
        result = (value[i] === null || value[i] === undefined) && result;
    }
    return result;
}

export function isNotNullOrUndefined(...value: any[]): boolean {
    if (value === null || value === undefined) return false;
    let result = true;
    for (let i = 0; i < value.length; i++) {
        result = (!(value[i] === null || value[i] === undefined)) && result;
    }
    return result;
}

export function isEmpty(value: string | any[] | any): boolean {
    if (isNullOrUndefined(value)) {
        return true;
    }
    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }
    return false;
}

export function isNotEmpty(value: string | any[] | any): boolean {
    return !isEmpty(value);
}

export function isObject(value: any): boolean {
    return value instanceof Object;
}

export function isString(value: any): boolean {
    return typeof value === 'string';
}

export function isBoolean(value: any): boolean {
    return typeof value === 'boolean';
}

export function isDate(value: any): boolean {
    return value instanceof Date;
}

export function isArray(value: any): boolean {
    return Array.isArray(value);
}

export function isEquals(value: any, otherValue: any): boolean {
    return JSON.stringify(value) === JSON.stringify(otherValue);
}

export function isNumber(value: any): boolean {
    return !isNaN(value);
}

export function isModel(value: any): boolean {
    return isNotNullOrUndefined(value) && isObject(value) && 'id' in value;
}

export function isPrimitive(value: any): boolean {
    return isString(value) || isBoolean(value) || isDate(value) || isNumber(value);
}

export function splitArray(values: any[], size: number) {
    if (isEmpty(values)) {
        return [];
    }
    const result = [];
    while (values.length) {
        result.push(values.splice(0, size));
    }
    return result;
}

export function arraysIsEqualsIgnoreOrder(firstArray: any[], secondArray: any[], callback: (lastValue: any, newValue: any) => boolean | null): boolean {
    if ((isNullOrUndefined(firstArray) && isNotNullOrUndefined(secondArray)) ||
        (isNullOrUndefined(secondArray) && isNotNullOrUndefined(firstArray)) ||
        firstArray.length !== secondArray.length) {
        return false;
    }
    const uniqueValues = new Set([...firstArray, ...secondArray]);
    for (const v of uniqueValues) {
        if (isNullOrUndefined(callback)) {
            const aCount = firstArray.filter(e => e === v).length;
            const bCount = secondArray.filter(e => e === v).length;
            if (aCount !== bCount) return false;
        } else {
            const aCount = firstArray.filter(e => callback(e, v)).length;
            const bCount = secondArray.filter(e => callback(e, v)).length;
            if (aCount !== bCount) return false;
        }
    }
    return true;
}
