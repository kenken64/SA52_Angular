import { NgModule } from "@angular/core";

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const MODULES = [
    FlexLayoutModule,
    MatToolbarModule, MatListModule,
    MatButtonModule, MatIconModule,
    MatCardModule
]

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }