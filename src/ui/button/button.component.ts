import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TButton } from "./button.type";

@Component({
    selector: 'button[initium-button]',
    standalone: true,
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @Input('role') role: TButton = 'cancel';
}
