import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { StockService } from './stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ WebsocketService, StockService ]
})
export class AppComponent {
  constructor(private stockService: StockService) {
		stockService.stockData.subscribe(msg => {
      		console.log(msg.data);
		});
	}

  private message = {
		author: 'tutorialedge',
		message: 'this is a test message'
	}
}
