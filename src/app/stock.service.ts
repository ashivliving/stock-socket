import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

const STOCK_URL = 'ws://stocks.mnet.website/';

export interface Stock {
	data : []
}

@Injectable()
export class StockService {
	public stockData: Subject<Stock>;

	constructor(wsService: WebsocketService) {
		this.stockData = <Subject<Stock>>wsService
			.connect(STOCK_URL)
			.pipe(map((response: MessageEvent): Stock => {
			    let data = JSON.parse(response.data);
			    return {
			     data : data
			    }
			}));
	}
}