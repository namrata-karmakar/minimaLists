import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateOfBirthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const dateOfBirth: Date = control.value;
        const limitInYears = 18;
        const todayDateInMillis = new Date().getTime();
        const userDOBInMillis = new Date(dateOfBirth).getTime();
        const differenceInYears = (todayDateInMillis - userDOBInMillis) / 31556952000;
        const isUserMinor = differenceInYears <= limitInYears;
        return isUserMinor ? { ageOutOfRange: true } : null;
    };
}
