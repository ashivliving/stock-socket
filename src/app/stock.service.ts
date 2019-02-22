import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

const STOCK_URL = 'ws://stocks.mnet.website/';

export interface Message {
	
}

@Injectable()
export class StockService {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(STOCK_URL)
			.pipe(map((response: MessageEvent): Message => {
			    let data = JSON.parse(response.data);
			    return {
			     data : data
			    }
			}));
	}
}