import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
    selector: '[initiumBorderColorChanger]',
    standalone: true
})
export class BorderColorChangerDirective<T extends HTMLElement> {
    #element: T = inject(ElementRef).nativeElement;
    #renderer: Renderer2 = inject(Renderer2);

    @HostListener('focus') onFocus(): void {
        this.#renderer.setStyle(this.#element, 'border-color', '#2F7FD5');
    }

    @HostListener('blur') onBlur(): void {
        this.#renderer.setStyle(this.#element, 'border-color', '#505662');
    }
}
