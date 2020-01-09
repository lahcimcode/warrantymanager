import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['./user-activate.component.css']
})
export class UserActivateComponent implements OnInit {

  private activationCode: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.activationCode = this.route.snapshot.queryParamMap.get('activationCode');
    // dispatch na aktywacje
    // snapshot z selectrem na wynik aktywacji albo zwrot wyniku prze metode
  }

}
