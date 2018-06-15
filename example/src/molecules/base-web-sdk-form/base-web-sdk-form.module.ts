import {
    CommonModule,
} from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FormsModule,
} from '@angular/forms';
import 'reflect-metadata';
import 'zone.js';

import {
    BaseWebSdkFormComponent,
} from './base-web-sdk-form.component';

@NgModule({
    declarations: [
        BaseWebSdkFormComponent,
    ],
    exports: [
        BaseWebSdkFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class BaseWebSdkFormModule { }
