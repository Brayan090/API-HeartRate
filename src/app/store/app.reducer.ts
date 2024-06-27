import { ActionReducerMap } from "@ngrx/store";
import * as PlayerReducer from '../Componenets/player/store/player.reducer';
import * as ArtistReducer from '../Componenets/content/artist/store/artist.reducer';
import * as PlayerListReducer from '../Componenets/content/player-list/store/player-list.reducer';
import * as LibraryReducer from '../Componenets/library/store/library.reducer';
import * as AuthReducer from '../Componenets/auth/store/auth.reducer';
export interface AppState {
    auth:AuthReducer.State
    player: PlayerReducer.State,
    artist: ArtistReducer.State,
    playerList: PlayerListReducer.State,
    library: LibraryReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    auth:AuthReducer.authReducer,
    player:PlayerReducer.playerReducer,
    artist:ArtistReducer.artistReducer,
    playerList:PlayerListReducer.playerListReducer,
    library:LibraryReducer.libraryReducer
}
