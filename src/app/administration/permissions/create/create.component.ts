import { Router } from '@angular/router';
import { ExplicitPermissionStateTexts } from './../../../core/models/enums/explicit-permission-state';
import { Dictionary } from './../../../core/models/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/core/services/permission.service';
import { ExplicitPermissionState } from 'src/app/core/models/enums/explicit-permission-state';
import { Support } from 'src/app/core/lib/support';
import { CreateExplicitPermissionParams } from 'src/app/core/models/permissions';
import { ValidationHelper } from 'src/app/core/lib/validators';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
    form: FormGroup;
    states: Dictionary<number, string>;

    constructor(
        private fb: FormBuilder,
        private permissionService: PermissionService,
        private router: Router
    ) { }

    get isRole(): boolean { return this.form.get('isRole')?.value as boolean ?? false; }

    ngOnInit(): void {
        this.states = Object.keys(ExplicitPermissionState).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o, value: ExplicitPermissionStateTexts[Support.getEnumKeyByValue(ExplicitPermissionState, o)] as string }));

        this.form = this.fb.group({
            // eslint-disable-next-line @typescript-eslint/unbound-method
            command: [null, Validators.required],
            isRole: [false],
            role: [null],
            user: [null],
            state: [this.states[0].key]
        });
    }

    submitForm(): void {
        const params = CreateExplicitPermissionParams.create(this.form.value);

        this.permissionService.createExplicitPermission(params).subscribe(_ => {
            this.router.navigateByUrl('/admin/permissions');
        });
    }

    hasError(controlId: string, errorId: string = null): boolean {
        return ValidationHelper.isInvalid(this.form, controlId, errorId);
    }

    isValid(): boolean {
        let isValid = this.form.valid;

        if (this.isRole) {
            const validationResult = Validators.required(this.form.get('role'));
            isValid = isValid && validationResult == null;
        } else {
            const validationResult = Validators.required(this.form.get('user'));
            isValid = isValid && validationResult == null;
        }

        return isValid;
    }
}
