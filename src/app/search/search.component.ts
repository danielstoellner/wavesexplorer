import {Component, OnInit} from '@angular/core';
import {Block} from "../blocks/block";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {WavesApiService} from "../common/waves-api.service";
import {BackendApiService} from "../common/backend-api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  lengthSearchTerm: number;
  blocks: Block[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private backendApiService: BackendApiService,
    private wavesApiService: WavesApiService,
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
        this.lengthSearchTerm = searchTerm.length;
        search = searchTerm.trim();
        if(Number(search)){
          //this.router.navigateByUrl("/detail/" + searchTerm);
          this.wavesApiService.getBlockAt(Number(search)).subscribe(
            block => this.router.navigateByUrl( "/detail/" + block.height));
          this.loading = false;
        } else if (this.lengthSearchTerm > 35){
          this.wavesApiService.getTransaction(search).subscribe(
            transaction => this.router.navigateByUrl( "/transaction/" + transaction.id));
        } else {
          this.wavesApiService.getBalance(search).subscribe(
            address => this.router.navigateByUrl( "/addresses/detail/" + address.address));

          this.searchTerm = searchTerm + "";
        }
      }
    }, 1000);
  }
}
