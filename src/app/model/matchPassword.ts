import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators{
    static MatchValidator(pass: string, cnfrm:string):ValidatorFn{
        return(control: AbstractControl):ValidationErrors | null=>{
            const password = control.get(pass)?.value;
            const cnfrm_pass = control.get(cnfrm)?.value;

            if(password === cnfrm_pass){
                return null;
            } 
            else {
                return { mismatch:true};
            }
        };
    }
}