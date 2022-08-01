import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SortParams } from 'src/app/core/models/common';

@Directive({
    selector: '[sortable]'
})
export class SortingDirective implements OnInit {
    @Input() key: string;
    @Input() current: string;
    @Input() sortDesc: boolean;
    @Input() sort: SortParams | null = null; // TODO Migrate to this property.

    @Output() clicked = new EventEmitter<string>();

    constructor(private ref: ElementRef<HTMLElement>) { }

    @HostListener('click')
    onClick(): void {
        this.clicked.emit(this.key);
        this.setSortIcon();
    }

    ngOnInit(): void {
        this.ref.nativeElement.classList.add('sortable');

        const current = this.sort?.orderBy ?? this.current;
        if (current === this.key) {
            this.setSortIcon();
        }
    }

    setSortIcon(): void {
        document.querySelectorAll('.sortable').forEach(elem => elem.classList.remove('sort-desc', 'sort-asc'));

        const sortDesc = this.sort?.descending ?? this.sortDesc;
        if (sortDesc) {
            this.ref.nativeElement.classList.add('sort-desc');
        } else {
            this.ref.nativeElement.classList.add('sort-asc');
        }
    }
}
