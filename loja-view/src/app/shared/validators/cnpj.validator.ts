import { FormControl } from '@angular/forms';

// adaptado de: https://gist.github.com/alexbruno/6623b5afa847f891de9cb6f704d86d02
export class CnpjValidator {
    public validate(control: FormControl): any { 
        let cnpj = control.value;
        if (!cnpj) return { invalidCnpj: true }
        const match = cnpj.toString().match(/\d/g)
        const numbers = Array.isArray(match) ? match.map(Number) : []
        // Valida a quantidade de dígitos
        if (numbers.length !== 14) return { invalidCnpj: true }
        // Elimina inválidos com todos os dígitos iguais
        const items = [...new Set(numbers)]
        if (items.length === 1) return { invalidCnpj: true }
        // Cálculo validador
        const calc = (x) => {
            const slice = numbers.slice(0, x)
            let factor = x - 7
            let sum = 0

            for (let i = x; i >= 1; i--) {
                const n = slice[x - i]
                sum += n * factor--
                if (factor < 2) factor = 9
            }
            const result = 11 - (sum % 11)
            return result > 9 ? 0 : result
        }
        // Separa os 2 últimos dígitos de verificadores
        const digits = numbers.slice(12)
        // Valida 1o. dígito verificador
        const digit0 = calc(12)
        if (digit0 !== digits[0]) return { invalidCnpj: true }
        // Valida 2o. dígito verificador
        const digit1 = calc(13)
        if (digit1 != digits[1]) return { invalidCnpj: true }
        return null;
    }
}