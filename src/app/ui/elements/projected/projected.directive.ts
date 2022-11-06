import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[uiProjected]',
})
export class ProjectedDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
