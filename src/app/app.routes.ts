import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { FileLoaderComponent } from './file-loader/file-loader.component';


export const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'table', component: TableComponent},
    { path: 'file-loader', component: FileLoaderComponent },
];
