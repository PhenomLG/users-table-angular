import { ChangeDetectionStrategy, Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
    selector: 'initium-checkbox',
    standalone: true,
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    imports: [
        NgIf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
    @Output() flowUpStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
    checked: InputSignal<boolean> = input.required<boolean>();
    id: InputSignal<string> = input.required<string>();
    line: InputSignal<boolean> = input<boolean>(false);

    onChange(e: Event): void {
        let $el: HTMLInputElement = (e.target as HTMLInputElement);
        this.flowUpStatus.emit($el.checked);
    }
}
