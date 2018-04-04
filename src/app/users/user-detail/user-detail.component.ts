import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {GroupsService} from "../../groups/group.service";
import {Group} from "../../groups/group";

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
    private userService: UserService,
    private groupService: GroupsService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      const id = + this.route.snapshot.paramMap.get('id');
      this.userService.getUser(id).subscribe(user => this.user = user);
      this.groupService.getGroups()
        .subscribe(group => this.availableGroups = group);
      this.loading = false;
    }, 1000);

  }

  getUser(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    const result = this.userService.deleteUser(this.user).subscribe();
    this.goBack();
  }
}
