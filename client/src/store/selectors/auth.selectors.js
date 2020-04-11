import { createSelector } from 'reselect';

export const getAuthState = (state) => state.auth;

export const getProcessing = createSelector(
  getAuthState,
  (auth) => auth.processing
);

export const getProcessed = createSelector(
  getAuthState,
  (auth) => auth.processed
);

export const getSignedInWith = createSelector(
  getAuthState,
  (auth) => auth.signedInWith
);

export const getError = createSelector(getAuthState, (auth) => {
  return auth.error;
});

export const getCurrentUser = createSelector(getAuthState, (auth) => auth.user);

export const getIsSignedIn = createSelector(
  getAuthState,
  (auth) => auth.token !== null
);

export const getDefaultPath = createSelector(
  getAuthState,
  (auth) => auth.defaultPath
);
