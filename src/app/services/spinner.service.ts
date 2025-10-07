import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private subjects = new Map<string, BehaviorSubject<boolean>>();
  private counts = new Map<string, number>();

  private ensure(key: string){
    if(!this.subjects.has(key)){
      this.subjects.set(key, new BehaviorSubject<boolean>(false));
      this.counts.set(key, 0);
    }
    return this.subjects.get(key)!;
  }

  isLoading$(key:string): Observable<boolean>{
    this.ensure(key);
    return this.subjects.get(key)!.asObservable();
  }

  setLoading(key: string, state: boolean){
    const subject = this.ensure(key);

    let count = this.counts.get(key) ?? 0;

    if(state){
      count +=1;
      this.counts.set(key, count);
      if(count === 1){
        subject.next(true);
      }else{
        count = Math.max(0, count -1);
        this.counts.set(key, count);
        if(count === 0){
          subject.next(false);
        }
      }
    }
  }

  show(key: string){
    this.setLoading(key, true);
  }

  hide(key: string){
    this.setLoading(key, false);
  }
}
