import { FormControl } from '@angular/forms';

export class CnpjValidator {
    public validate(control: FormControl) { 
        let cnpj = control.value;
    }
}