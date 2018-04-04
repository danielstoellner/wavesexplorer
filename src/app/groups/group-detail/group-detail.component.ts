import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../users/user.service";
import {Location} from "@angular/common";
import {Group} from "../group";
import {GroupsService} from "../group.service";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  @Input()
  group: Group;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getGroup();
  }

  getGroup(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(group => this.group = group);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.groupService.updateGroup(this.group)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    const result = this.groupService.deleteGroup(this.group).subscribe();
    this.goBack();
  }
}
