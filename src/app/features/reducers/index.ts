import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import * as fromSearch from './search';
import * as fromVideos from './video';
import { environment } from '../../../environments/environment';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRoute from '../reducers/route';

export interface State {
    search: fromSearch.State;
    videos: fromVideos.State;
}


export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
  }

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
export const selectStarshipsState = createFeatureSelector<State>(
   'youtube'
  );

export const reducers: ActionReducerMap<State> = {
    search: fromSearch.reducer,
    videos: fromVideos.reducer
};

const developmentReducer = compose(storeFreeze, combineReducers)(reducers);
const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}

export const getVideosState = (state: State) => state.videos;
export const getSearchState = (state: State) => state.search;

export const getVideoEntities = createSelector(getVideosState, fromVideos.getEntities);
export const getVideoIds = createSelector(getVideosState, fromVideos.getIds);
export const getSelectedVideoId = createSelector(getVideosState, fromVideos.getSelectedId);
export const getSelectedVideo = createSelector(getVideosState, fromVideos.getSelected);

export const getSearchVideoIds = createSelector(getSearchState, fromSearch.getIds);
export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);

export const getSearchResults = createSelector(getVideoEntities, getSearchVideoIds, (videos, searchIds) => {
    return searchIds.map(id => videos[id]);
});

export const getCurrentVideo = createSelector(
    getVideoEntities,
    fromRoute.getRouterInfo,
    (videos, routerInfo) => {
      if (videos && routerInfo) {
        const id = routerInfo.params.id;
        return videos[id];
      }
      return null;
    }
  );

