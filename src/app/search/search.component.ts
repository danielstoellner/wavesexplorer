import {Component, OnInit} from '@angular/core';
import {Block, BlockHeight} from "../blocks/block";
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
        // Block Number
        if(Number(search)){
          this.wavesApiService.getBlockAt(Number(search)).subscribe(
            block => this.router.navigateByUrl( "/detail/" + block.height));
          this.loading = false;
          // Block Signature
        } else if (this.lengthSearchTerm > 50){
          this.wavesApiService.getBlockSignature(search).subscribe(
            block => this.router.navigateByUrl( "/detail/" + block.height));
          this.loading = false;
          // Transaktion ID
        } else if (this.lengthSearchTerm > 35){
          this.wavesApiService.getTransaction(search).subscribe(
            transaction => this.router.navigateByUrl( "/transaction/" + transaction.id));
          // Address ID
        } else {
          this.wavesApiService.getBalance(search).subscribe(
            address => this.router.navigateByUrl( "/addresses/detail/" + address.address));

          this.searchTerm = searchTerm + "";
        }
      }
    }, 1000);
  }
}
