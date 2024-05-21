import { ChangeDetectionStrategy, Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
    selector: 'initium-checkbox',
    standalone: true,
    imports: [
        NgIf
    ],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
    checked: InputSignal<boolean> = input.required<boolean>();
    id: InputSignal<string> = input.required<string>();
    line: InputSignal<boolean> = input<boolean>(false);
    @Output() flowUpStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

    onChange(e: Event): void {
        let $el: HTMLInputElement = (e.target as HTMLInputElement);
        console.log($el.checked);
        this.flowUpStatus.emit($el.checked);
    }
}
