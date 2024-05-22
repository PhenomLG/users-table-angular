import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'initium-default-overlay',
    standalone: true,
    imports: [],
    templateUrl: './default-overlay.component.html',
    styleUrl: './default-overlay.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultOverlayComponent {

}
