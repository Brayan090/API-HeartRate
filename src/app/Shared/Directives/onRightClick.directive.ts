import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[appRightClick]'
})
export class onRightClickDirective {
  @Output() rightClick = new EventEmitter<{event:Event,id:number}>();
  @Input('appRightClick') idElement:number;

  
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: Event) {
    event.preventDefault(); // Previene el menú contextual del navegador
    this.rightClick.emit({event:event,id:this.idElement});
  }
}
