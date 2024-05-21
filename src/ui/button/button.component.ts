import { Component, Input } from '@angular/core';
import { TButton } from "./button.type";

@Component({
  selector: 'button[initium-button]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input('role') role: TButton = 'cancel';
}
