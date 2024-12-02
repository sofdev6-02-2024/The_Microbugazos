
export function ValidateIntegerNumber(value: string ) {
    const regex = RegExp("d+$");
    if (!value) return {isValid: false, errorMessage: "Value cannot be null or empty"};
    if (regex.test(value)) return {isValid: false, errorMessage: "Only numbers allowed"};
    return { isValid: true };
}

export function ValidateNumberWithDecimals(value: string ) {
    const regex = /^-?\d{1,14}(\.\d{1,2})?$/;
    if (!value) return { isValid: false, errorMessage: "Value cannot be null or empty" };
    if (!regex.test(value)) return { isValid: false, errorMessage: "Only numbers with up to 2 decimal places allowed (Use dot '.')"};
    return { isValid: true };
}