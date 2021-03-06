import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { Injectable } from '@angular/core';

@Injectable()
export class IconImport {

    constructor(public matIconRegistry: MatIconRegistry, public domSanitizer: DomSanitizer) {}

  iconInitializer() {
    this.matIconRegistry
      .addSvgIcon("pl", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/pl.svg"))
      .addSvgIcon("en", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/en.svg"))
      .addSvgIcon("logo", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/logo.svg"))
  }

}




