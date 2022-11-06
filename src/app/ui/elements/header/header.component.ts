import { Component, Input, ContentChild } from '@angular/core';
import { ProjectedDirective } from '../projected/projected.directive';

@Component({
    selector: 'ui-header',
    templateUrl: './header.component.html',
    styleUrls: [],
})
export class HeaderComponent {
    @Input()
    level = 6;

    @ContentChild(ProjectedDirective) content!: ProjectedDirective;

    contentId = undefined;
}
