export const types = {
  LOAD_IMAGES_START: 'LOAD_IMAGES_START',
  LOAD_IMAGES_SUCCESS: 'LOAD_IMAGES_SUCCESS',
  LOAD_IMAGES_fAILED: 'LOAD_IMAGES_fAILED',
  SEARCH_IMAGES_START: 'SEARCH_IMAGES_START',
  SEARCH_IMAGES_SUCCESS: 'SEARCH_IMAGES_SUCCESS',
  SEARCH_IMAGES_FAILED: 'SEARCH_IMAGES_FAILED',
  LOADING: 'LOADING',
};
export const search_start = (data) => ({
  type: types.SEARCH_IMAGES_START,
  payload: data,
});
export const load_start = (data) => ({
  type: types.LOAD_IMAGES_START,
  payload: data,
});
