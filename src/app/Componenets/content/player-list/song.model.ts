
export class Song{
    constructor(
        public id:number,
        public name:string,
        public src:string,
        public album:{name:string,releaseDate:string,coverImage:string},
        public genre:number
    ){}
}
