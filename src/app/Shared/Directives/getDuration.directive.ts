import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive(
    {selector:'[appGetDuration]'}
)
export class GetDuration implements OnInit{
    @Input('appGetDuration') src:string;
    private audio:HTMLAudioElement;
    constructor(private render:Renderer2, private elRef:ElementRef){}

    ngOnInit(): void {
        const soundLink = this.src;
        this.audio = new Audio();
        this.audio.src = soundLink;
        this.audio.onloadedmetadata = ()=>{
            const duration  = this.transform(this.audio.duration)
            this.render.setProperty(this.elRef.nativeElement,'innerHTML',duration)
        }
    }

    transform(value:number) {
        if (!value) {
            return '00:00';
        }

        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes < 10 ? '0':''}${minutes}:${seconds < 10 ? '0':''}${seconds}`;
    }
}