
export function ValidateName(value: string) {
    const regex = /^[A-Za-z0-9_,.\-\s]+$/;
    if (!value) return { isValid: false, errorMessage: "Value cannot be null or empty" };
    if (value.length < 3 || value.length > 128) return { isValid: false, errorMessage: "Length text, minimum 3, max 128" };
    if (!regex.test(value)) return { isValid: false, errorMessage: "Only numbers, letters, and these characters are allowed: (_,.-)" };
    return { isValid: true };
}

export function ValidateLongText( value: string ) {
    const regex = RegExp("^[A-Za-z0-9_,.\\-\\s]{1,460}$");
    if (!value) return {isValid: false, errorMessage: "Value cannot be null or empty"};
    if (!regex.test(value))return {isValid: false, errorMessage: "Numbers, letters and this characters are allowed (_,.-)"};
    return { isValid: true };
}