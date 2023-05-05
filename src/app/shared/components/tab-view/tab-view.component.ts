import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css']
})
export class TabViewComponent {
  selectedTab = 'tab1';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
