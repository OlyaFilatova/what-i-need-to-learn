import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
