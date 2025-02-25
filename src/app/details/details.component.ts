import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResidenceService } from '../service/residence.service';
import { Residence } from 'src/core/models/residence';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id!:number
 listRes:Residence=new Residence
  constructor(private act:ActivatedRoute,private resServ:ResidenceService) { }

  ngOnInit(): void {
    //id is chnowa aadit bdht fl app-routing, ken aadit haja okhra nwali houni nhot nafs li hatitha ghady
    this.id=this.act.snapshot.params['id']  
    this.resServ.getResidence(this.id).subscribe((data)=>{
      this.listRes=data

    }
    )
}
}
