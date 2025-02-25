import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenceService } from '../service/residence.service';
import { Residence } from 'src/core/models/residence';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  formR!:FormGroup
  idupdate!:number
  listres:Residence=new Residence
  constructor(private act:ActivatedRoute, private ressService:ResidenceService, private router:Router) { }
ngOnInit(): void {
  this.idupdate= this.act.snapshot.params['id']
  this.formR=new FormGroup({
    id:new FormControl('',[Validators.required,Validators.minLength(3)]),
    name:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z]/)]),
    address:new FormControl('',[Validators.required,Validators.maxLength(10)]),
    image:new FormControl('../../assets/images/R1.jpg',Validators.required),
    status:new FormControl('',[Validators.required,Validators.pattern(/^disponible$/)]),

  })
  this.ressService.getResidence(this.idupdate).subscribe((data)=>{
    this.listres=data
    console.log(this.listres)
    this.formR.patchValue(this.listres as any)

  })
}

get status(){
  return this.formR.get('status')
}
update(){
  this.ressService.updateResidence(this.formR.value,this.idupdate).subscribe(()=>{
  this.router.navigate(['/residence'])
  })
}
}
