import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { MediaControlService } from "src/app/Shared/Services/media-control.service";


@Directive({
    selector:'[appReset]'
})
export class ResetDirective implements OnInit{

    @Input('appReset') data:number;

    constructor(private el:ElementRef,private render:Renderer2,private mediaControl:MediaControlService){}


    ngOnInit() {
        const parentDiv = this.el.nativeElement
        const num = parentDiv.querySelector('#num');
        this.mediaControl.isPlaying$.subscribe(state=>{
            if(state.isPlaying){
                if (this.data !== state.idSong) {
                    this.render.removeClass(this.el.nativeElement,'bi-disc');
                    this.render.removeClass(this.el.nativeElement,'reproduction');
                    this.render.setStyle(num,'display','inline')
                }
            }
            if (!state.isPlaying) {
                if (this.data === state.idSong) {
                    this.render.removeClass(this.el.nativeElement,'bi-disc');
                    this.render.removeClass(this.el.nativeElement,'reproduction');
                    this.render.setStyle(num,'display','inline')
                }
            }
          })
    }
}