import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent> { //Function to connect to WS
    if (!this.subject) {
      this.subject = this.create(url);
    } 
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create(
	(obs: Observer<MessageEvent>) => {
		ws.onmessage = obs.next.bind(obs);
		ws.onerror = obs.error.bind(obs);
		ws.onclose = obs.complete.bind(obs);
		return ws.close.bind(ws);
	})
	let observer = {
		
	}
	return Subject.create(observer, observable);
  }

}
