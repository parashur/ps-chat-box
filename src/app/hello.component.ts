import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h5 class="text-white pl-3 pt-3">Hello {{name}}!</h5>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
