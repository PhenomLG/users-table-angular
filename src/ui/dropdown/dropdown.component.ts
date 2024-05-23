import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgForOf } from "@angular/common";

export type TSelectOption = {
    value: string,
    label: string
}

@Component({
    selector: 'initium-dropdown',
    standalone: true,
    imports: [
        FormsModule,
        NgForOf
    ],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DropdownComponent),
        }
    ]
})
export class DropdownComponent implements ControlValueAccessor {
    @Input({ required: true }) options!: TSelectOption[];
    protected selectedOption!: string;

    private onChange: Function = (value: string) => {};

    writeValue(value: string): void {
        this.selectedOption = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {}

    setDisabledState?(isDisabled: boolean): void {}

    onOptionChange(event: Event): void {
        let el: HTMLSelectElement = event.target as HTMLSelectElement;
        this.onChange(el.value);
    }
}
