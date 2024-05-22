import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'input[initium-input]',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})
export class InputComponent {
}
