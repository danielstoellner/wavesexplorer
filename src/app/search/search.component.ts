import {Component, Input, OnInit} from '@angular/core';
import {Block} from "../blocks/block";
import {BlocksService} from "../blocks/blocks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../users/user.service";
import {GroupsService} from "../groups/group.service";
import {Location} from "@angular/common";
import {AddressesService} from "../addresses/addresses.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  blocks: Block[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private blockService: BlocksService,
    private addressService: AddressesService,
    private userService: UserService,
    private groupService: GroupsService,
    private location: Location,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    var search = "";
    setTimeout(() => {
      const searchTerm = this.route.snapshot.paramMap.get('searchTerm');
      if(search != null && searchTerm != null){
        search = searchTerm.trim();
        if(Number(search)){
          //this.router.navigateByUrl("/detail/" + searchTerm);
          this.blockService.getBlockAt(Number(search)).subscribe(
            block => this.router.navigateByUrl( "/detail/" + block.height));
          this.loading = false;
        } else {
          this.addressService.getBalance(search).subscribe(
            address => this.router.navigateByUrl( "/addresses/detail/" + address.address));

          this.searchTerm = searchTerm + "";
        }
      }
    }, 1000);
  }
}
