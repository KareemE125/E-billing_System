import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  selectedTab = 'tab1';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}
