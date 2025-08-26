import parsePhoneNumberFromString from "libphonenumber-js";

export function formatarTelefone(numero: string | null | undefined): string {
    if (!numero) {
        return "Não informado";
    }

    const phoneNumber = parsePhoneNumberFromString(numero, 'BR');

    if (phoneNumber) {
        return phoneNumber.formatNational();
    }

    return numero;
}