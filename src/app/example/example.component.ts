import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TaskService} from './example.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  tasks$: Observable<any>;

  constructor(private readonly service: TaskService) {
  }

  ngOnInit() {
    this.tasks$ = this.service.getData();
  }
}
