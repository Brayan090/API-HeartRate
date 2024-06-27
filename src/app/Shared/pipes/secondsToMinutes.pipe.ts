import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'SecondsToMinutes'
})
export class SecondsToMinutesPipe implements PipeTransform{
    
    transform(value:number) {
        if (!value) {
            return '00:00';
        }

        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes < 10 ? '0':''}${minutes}:${seconds < 10 ? '0':''}${seconds}`;
    }

}