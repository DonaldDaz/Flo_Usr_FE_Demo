import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'dashboard',
  imports: [ TableComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
