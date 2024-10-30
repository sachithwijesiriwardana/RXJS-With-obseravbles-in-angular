import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  private refDes = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`The button was clicked ${this.clickCount()} times.`);
    // });
  }

  ngOnInit(): void {
    // Logic that was commented out in your original code
    const subscribe = this.clickCount$.subscribe({
      next: (val) => console.log('hello', this.clickCount()),
    });
    this.refDes.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }

  // Corrected method name and typo
  onclick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
