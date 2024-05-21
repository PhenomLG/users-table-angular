import { Component, input, InputSignal } from '@angular/core';

type TCheckMarkState = 'unselected' | 'indeterminate' | 'selected';

@Component({
    selector: 'initium-checkbox',
    standalone: true,
    imports: [],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
    checkmarkState: InputSignal<TCheckMarkState> = input<TCheckMarkState>('unselected');
}
