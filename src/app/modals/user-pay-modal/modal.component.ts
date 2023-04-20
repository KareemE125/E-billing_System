import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-pay-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() rowIndex: number = 0;

  selectedTab = 'tab1';
  showModal = false;

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal() {
    this.showModal = false;
    console.log('====================================');
    console.log("ppp");
    console.log('====================================');
  }
}
