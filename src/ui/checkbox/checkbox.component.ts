import { ChangeDetectionStrategy, Component, EventEmitter, input, InputSignal, Output } from '@angular/core';

type TCheckMarkState = 'unselected' | 'indeterminate' | 'selected';

@Component({
    selector: 'initium-checkbox',
    standalone: true,
    imports: [],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
    checked: InputSignal<boolean> = input<boolean>(false);
    checkmarkState: InputSignal<TCheckMarkState> = input<TCheckMarkState>('unselected');
    @Output() flowUpStatus: EventEmitter<boolean> = new EventEmitter();

    onChange(e: Event): void {
        let $el: HTMLInputElement = (e.target as HTMLInputElement);
        this.flowUpStatus.emit($el.checked);
    }
}
