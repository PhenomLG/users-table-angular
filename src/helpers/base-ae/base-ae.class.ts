import { inject, Injector } from "@angular/core";
import { registerAE } from "./registerAE.function";

export abstract class BaseAE {
    readonly componentName: string;

    abstract show(...arg: any[]): this;
    abstract hide(): this;

    private parent: Element = document.body;
    protected inj: Injector = inject(Injector);

    constructor(componentName: string, injector?: Injector, component?: any) {
        this.componentName = componentName;
        registerAE(this.componentName, component, this.inj);
    }

    protected getParent(): Element {
        return this.parent;
    }

    protected setParent(node: Element): this {
        this.parent = node;
        return this;
    }
}
