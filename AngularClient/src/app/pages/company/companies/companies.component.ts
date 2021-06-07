
import { Component, OnInit } from '@angular/core'; 
import { Company } from 'src/app/_interfaces/company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  public companies: Company[];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies = () => {
    this.companyService.getCompanies()
    .subscribe(res => {
      this.companies = res as Company[];
    })
  }
}
