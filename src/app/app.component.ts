import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { StockService } from './stock.service';
import { _ } from 'underscore';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ WebsocketService, StockService ]
})
export class AppComponent {
  	constructor(stockService: StockService) {
		this.subscribeToSocket(stockService);
		this.initializeStock();
	}
	
	public stockData = [];
	private subscription;	

	updateData(data) {
		_.each(data, ([name, price]) => {
			if(_.find(this.stockData, {stockname:name})) {
				let index = _.findIndex(this.stockData, {stockname:name});
				let this_stock = _.find(this.stockData, {stockname:name});
				let updateStock = {
					"stockname" : name,
					"currentprice" : price,
					"oldprice" : this_stock.currentprice,
					"updated_at" : +new Date(),
					"is_new" : false
				};
				this.stockData[index] = updateStock;
			} else {
				let newStock = {
					"stockname" : name,
					"currentprice" : price,
					"oldprice" : null,
					"updated_at" : +new Date(),
					"is_new" : true 
				};
				this.stockData.push(newStock);
			}
		});

		this.setStockData();
	}

	initializeStock() {
		this.stockData = (JSON.parse(localStorage.getItem('stocks'))) ? JSON.parse(localStorage.getItem('stocks')) : [];
	}

	setStockData() {
		localStorage.setItem('stocks', JSON.stringify(this.stockData));
	}

	subscribeToSocket(stockService) {
		this.subscription = stockService.stockData.subscribe(msg => {
      		this.updateData(msg.data);
		});
	}

	unsubscribeToSocket() {
		this.subscription.unsubscribe();
	}

	getUpdatedTime(time) {
		let currentTime = +new Date();
		if(currentTime - time < 1000) {
			return "Just now";
		} else if(currentTime - time < 30000 && currentTime - time > 1000) {
			return Math.floor((currentTime-time)/1000) + " Seconds Ago";
		} else if(moment(currentTime).startOf('day') < moment(time)) {
			return moment(time).format('HH:mm A');
		} else {
			return moment(time).format('DD/MM HH:mm A');
		}
	}

	getBackground(currentPrice, oldPrice) {
		if(!oldPrice) {
			return '#95979b';
		} else if(currentPrice >= oldPrice) {
			return '#439124';
		} else if(currentPrice < oldPrice) {
			return '#c62825';
		}
	}
}
