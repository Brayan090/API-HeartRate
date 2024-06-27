import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from "@angular/core";
import { MediaControlService } from "src/app/Shared/Services/media-control.service";


@Directive({
    selector:'[appTogglePlayPause]'
})
export class TogglePlayPauseDirective implements OnInit{

    @Input('appTogglePlayPause') data:{isPlaying:boolean,songSelected:number,idSong:number}

    constructor(private elementRef:ElementRef,private render:Renderer2,private mediaControl:MediaControlService){}

    ngOnInit(): void {
        const parentDiv = this.elementRef.nativeElement
        const btnToggle = parentDiv.querySelector('#btnToggle');
        this.mediaControl.isPlaying$.subscribe(state=>{
            if(state.isPlaying){
                if (this.data.songSelected === state.idSong) {
                    this.render.addClass(btnToggle,'bi-disc');
                    this.render.addClass(btnToggle,'reproduction');
                }
            }
          })
    }

    @HostListener('mouseenter')mouseOver(){
        const parentDiv = this.elementRef.nativeElement
        const btnToggle = parentDiv.querySelector('#btnToggle');
        const num = parentDiv.querySelector('#num');

        

        if((this.data.songSelected === this.data.idSong)){
            if (this.data.isPlaying) {
                this.render.removeClass(btnToggle, 'bi-disc');
                this.render.removeClass(btnToggle,'reproduction');
                this.render.removeClass(btnToggle, 'bi-play');
                this.render.addClass(btnToggle, 'bi-pause');
                this.render.setStyle(num,'display','none');
            }else{
                this.render.addClass(btnToggle, 'bi-play');
                this.render.setStyle(num,'display','none');
            }
            
        }else{
            this.render.addClass(btnToggle, 'bi-play');
            this.render.setStyle(num,'display','none');
        }

        
    }

    @HostListener('mouseleave')mouseLeave(){
        const parentDiv = this.elementRef.nativeElement
        const btnToggle = parentDiv.querySelector('#btnToggle');
        const num = parentDiv.querySelector('#num');


        if(this.data.isPlaying && (this.data.songSelected === this.data.idSong)){
            this.render.removeClass(btnToggle, 'bi-pause');
            this.render.addClass(btnToggle, 'bi-disc');
            this.render.addClass(btnToggle,'reproduction');
            this.render.setStyle(num,'display','none');
        }
        if((this.data.songSelected === this.data.idSong)){
            if (this.data.isPlaying) {
                this.render.removeClass(btnToggle, 'bi-pause');
                this.render.addClass(btnToggle, 'bi-disc');
                this.render.addClass(btnToggle,'reproduction');
                this.render.setStyle(num,'display','none');
            }else{
                this.render.removeClass(btnToggle, 'bi-play');
                this.render.setStyle(num,'display','inline');
            }
            
        }else{
            this.render.removeClass(btnToggle, 'bi-disc');
            this.render.removeClass(btnToggle,'reproduction');
            this.render.removeClass(btnToggle, 'bi-play');
            this.render.setStyle(num,'display','inline');
        }

        

    }



    @HostListener('click')click(){
        const parentDiv = this.elementRef.nativeElement
        const btnToggle = parentDiv.querySelector('#btnToggle');
        const num = parentDiv.querySelector('#num');
        if (this.data.isPlaying) {
            this.render.removeClass(btnToggle, 'bi-play');
            this.render.removeClass(btnToggle,'reproduction');
            this.render.addClass(btnToggle, 'bi-pause');
            this.render.setStyle(num,'display','none');
            
        }

        if (!this.data.isPlaying) {
            this.render.removeClass(btnToggle, 'bi-pause');
            this.render.removeClass(btnToggle,'reproduction');
            this.render.addClass(btnToggle, 'bi-play');
            this.render.setStyle(num,'display','none');
        }

    }



}