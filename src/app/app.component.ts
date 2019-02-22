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
		stockService.messages.subscribe(msg => {			
      		console.log("Response from websocket: " + msg);
      		console.dir(msg);
		});
	}

  private message = {
		author: 'tutorialedge',
		message: 'this is a test message'
	}

  sendMsg() {
		console.log('new message from client to websocket: ', this.message);
		this.stockService.messages.next();
		this.message.message = '';
	}
}
