import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Group} from "../../groups/group";
import {WavesApiService} from "../../common/waves-api.service";
import {BackendApiService} from "../../common/backend-api.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input()
  user: User;
  availableGroups: Group[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private backendApiService: BackendApiService,
    private wavesApiService: WavesApiService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      const id = + this.route.snapshot.paramMap.get('id');
      this.backendApiService.getUser(id).subscribe(user => this.user = user);
      this.backendApiService.getGroups()
        .subscribe(group => this.availableGroups = group);
      this.loading = false;
    }, 1000);

  }

  getUser(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.backendApiService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.backendApiService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    const result = this.backendApiService.deleteUser(this.user).subscribe();
    this.goBack();
  }
}
