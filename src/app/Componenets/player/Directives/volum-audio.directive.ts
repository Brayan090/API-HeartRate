import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";
import { MediaControlService } from "src/app/Shared/Services/media-control.service";

@Directive({
    selector:'[appVolumAudio]'
})
export class VolumAudioDirective implements AfterViewInit{

    constructor(private elementRef:ElementRef,private render:Renderer2,private mediaControl:MediaControlService){}

    ngAfterViewInit() {
        //Ajustar el ancho por volumen
        this.mediaControl.volume$.subscribe(levelVolum =>{
            this.setWidth((levelVolum*100).toString());
        })
      }

    private setWidth(value:string){
        let val:number = +value;

        if (+value <= 50) {
            val = +value + 1;
        }
        let width = `${val}%`;
        this.render.setStyle(this.elementRef.nativeElement,'width',width);
    }

}