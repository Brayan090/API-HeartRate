import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";
import { MediaControlService } from "src/app/Shared/Services/media-control.service";

@Directive({
    selector:'[appProgress]'
})
export class ProgressDirective implements AfterViewInit{
    duration:number;
    stopUpdate:boolean=false;
    @Input('appProgress') inputRange!:HTMLInputElement;

    constructor(private elementRef:ElementRef, private render: Renderer2,private mediaControl:MediaControlService){}

    ngAfterViewInit(){
        this.setWidth('0');
        this.mediaControl.duration$.subscribe(duration=>this.duration=duration)


        this.mediaControl.currentTime$.subscribe(time=>{
            if (!this.stopUpdate) {
                this.setWidth(((time / this.duration) * 100).toString())
            }
        });

        this.inputRange.addEventListener('input', this.onInput.bind(this));
        this.inputRange.addEventListener('change', this.change);
        
    }

    private change:EventListener = ()=> this.stopUpdate=false

    onInput(event: Event) {
        this.stopUpdate=true;
        const input = event.target as HTMLInputElement;
        this.setWidth(input.value);
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