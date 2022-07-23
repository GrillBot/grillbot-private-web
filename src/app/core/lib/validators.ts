import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

export class ValidationHelper {
    static isInvalid(form: AbstractControl, controlId: string, errorId: string = null): boolean {
        const control = form.get(controlId);
        if (!control.touched) { return false; }

        return errorId ? control.hasError(errorId) : control.invalid;
    }

    static multipleRequired(errorCode: string, ...controlIds: string[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const form = control as FormGroup;

            const formControls = controlIds.map(o => form.get(o));
            const values = formControls.map(o => o.value);

            const filledCount = values.filter(o => o).length;
            const emptyCount = values.filter(o => !o).length;

            if (filledCount === values.length || emptyCount === values.length) {
                return null;
            }

            const err = {};
            err[errorCode] = true;

            return err;
        }
    }
}
