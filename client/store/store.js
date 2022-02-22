import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "react-redux";
import thunk from "redux-thunk";
import albumsReducer from "../reducers/albums";
import artistsReducer from "../reducers/artists";
import playlistReducer from "../reducers/playlist";

const store = createStore(
  combineReducers({
    albums: albumsReducer,
    artists: artistsReducer,
    playlist: playlistReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
