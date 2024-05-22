import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { InputComponent } from "../../../../../../ui/input/input.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { HelperFunctions } from "../../../../../../helpers/HelperFunctions";
import { BorderColorChangerDirective } from "./border-color-changer.directive";

@Component({
    selector: 'initium-form-input',
    standalone: true,
    imports: [
        InputComponent,
        ReactiveFormsModule,
        BorderColorChangerDirective
    ],
    templateUrl: './form-input.component.html',
    styleUrl: './form-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent {
    control: InputSignal<FormControl<string>> = input.required<FormControl<string>>();
    label: InputSignal<string> = input.required<string>();
    placeholder: InputSignal<string> = input.required<string>();
    errorMessage: InputSignal<string | undefined> = input<string>();
    protected id: string = HelperFunctions.randomString(5);

    isControlInvalid(): boolean {
        return this.control().touched && this.control().invalid;
    }
}
