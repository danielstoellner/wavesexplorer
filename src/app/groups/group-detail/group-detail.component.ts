import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Group} from '../group';
import {User} from '../../users/user';
import {Address} from '../../addresses/address';
import {WavesApiService} from '../../common/waves-api.service';
import {BackendApiService} from '../../common/backend-api.service';
import {SettingsService} from '../../common/settings.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})

export class GroupDetailComponent implements OnInit {
  @Input()
  group: Group;
  users: User[] = [];
  addresses: Address[] = [];
  data: any;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private wavesApiService: WavesApiService,
    private backendApiService: BackendApiService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      this.getGroup().then(() => this.getUsers());

      this.loading = false;
    }, 1000);
  }

  async getGroup() {
    const id = + this.route.snapshot.paramMap.get('id');

    const result: Group = await this.backendApiService.getGroupPromise(id);
    this.group = result;
  }

  /**
   * get Users from Group by id
   * push found item to array
   * @returns {Promise<void>}
   */
  async getUsers() {
    const result: User[] = await this.backendApiService.getUsersPromise();

    result.forEach(user => {
      if (user.squads.length > 0){
        user.squads.forEach(group => {
          if(group.id === this.group.id){
            this.users.push(user);
          }
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.backendApiService.updateGroup(this.group)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    const result = this.backendApiService.deleteGroup(this.group).subscribe();
    this.goBack();
  }
}
