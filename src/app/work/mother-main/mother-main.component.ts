import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mother-main',
  templateUrl: './mother-main.component.html',
  styleUrls: ['./mother-main.component.css']
})
export class MotherMainComponent implements OnInit {
  mydate: Date;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.mydate = new Date();
    console.log(this.mydate);
  }

  onUpdateMotherData(id: number, number: number, colonyIdHiveBelongsTo: string, description?: string) {
    const url =  'api/hive/' + id + '/colony/' + colonyIdHiveBelongsTo;
    return this.httpClient.put(url, {'id': id, 'description': description, 'number': number}).toPromise();
  }

}
