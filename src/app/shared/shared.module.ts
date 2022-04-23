import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { DataListComponent } from './data-list/data-list.component';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { ListButtonComponent } from './list-button/list-button.component';
import { ModalComponent } from './modal/modal.component';
import { ValidationErrorsModalComponent } from './modal/validation-errors-modal/validation-errors-modal.component';
import { CommonDashboardComponent } from './common-dashboard/common-dashboard.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxBitmaskComponent } from './checkbox-bitmask/checkbox-bitmask.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { SortingDirective } from './data-list/sorting.directive';
import { TimeSpanInputComponent } from './time-span-input/time-span-input.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavigationComponent } from './navigation/navigation.component';
import { EmotePickerComponent } from './emote-picker/emote-picker.component';
import { DataListModule } from './data-list/data-list.module';

@NgModule({
    declarations: [
        CardComponent,
        LoadingComponent,
        ListButtonComponent,
        ModalComponent,
        ValidationErrorsModalComponent,
        CommonDashboardComponent,
        CheckboxComponent,
        CheckboxBitmaskComponent,
        TimeSpanInputComponent,
        SearchInputComponent,
        NavigationComponent,
        EmotePickerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        NgbModalModule,
        NgxFilesizeModule,
        NgSelectModule,
        DirectivesModule,
        PipesModule,
        DataListModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CardComponent,
        LoadingComponent,
        ListButtonComponent,
        ModalComponent,
        ValidationErrorsModalComponent,
        CommonDashboardComponent,
        CheckboxComponent,
        CheckboxBitmaskComponent,
        NgxFilesizeModule,
        TimeSpanInputComponent,
        SearchInputComponent,
        NgSelectModule,
        DirectivesModule,
        NavigationComponent,
        PipesModule,
        EmotePickerComponent,
        DataListModule
    ]
})
export class SharedModule { }
