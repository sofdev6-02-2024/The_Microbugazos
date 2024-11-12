
export function ValidateName(value: string) {
    const regex = /^[ñA-Za-z0-9_,.\-\s]+$/;
    if (!value) return { isValid: false, errorMessage: "Value cannot be null or empty" };
    if (value.length < 3 || value.length > 64) return { isValid: false, errorMessage: "Length text, minimum 3, max 64" };
    if (!regex.test(value)) return { isValid: false, errorMessage: "Only numbers, letters, and these characters are allowed: (_,.-)" };
    return { isValid: true };
}

export function ValidateShortText(value: string) {
    const regex = /^[ñA-Za-z0-9_,.\-\s]+$/;
    if (!value) return { isValid: false, errorMessage: "Value cannot be null or empty" };
    if (value.length < 1 || value.length > 24) return { isValid: false, errorMessage: "Length text, minimum 3, max 24" };
    if (!regex.test(value)) return { isValid: false, errorMessage: "Only numbers, letters, and these characters are allowed: (_,.-)" };
    return { isValid: true };
}

export function ValidateLongText( value: string ) {
    const regex = RegExp(/^[ñA-Za-z0-9\-_,.\s]{1,200}$/);
    if (!value) return {isValid: false, errorMessage: "Value cannot be null or empty"};
    if (!regex.test(value))return {isValid: false, errorMessage: "Numbers, letters and this characters are allowed (_,.-)"};
    return { isValid: true };
}