import { types } from './actions';

const initState = {
  loading: false,
  images: [],
  error: null,
  count: 30,
  start: 1,
};
export const imagesReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.LOADING:
      return { ...state, loading: true };
    case types.SEARCH_IMAGES_SUCCESS:
      console.log(payload);
      const loaded_images = payload.data.results.map((file) => {
        const url = file.urls.regular;
        return { src: url, width: file.width, height: file.height };
      });
      return { ...state, start: state.start + 1, loading: false, error: null, images: loaded_images };
    case types.LOAD_IMAGES_SUCCESS:
      console.log(payload);
      const new_images = payload.data.results.map((file) => {
        const url = file.urls.regular;
        return { src: url, width: file.width, height: file.height };
      });
      return { ...state, loading: false, error: null, start: state.start + 1, images: [...state.images, ...new_images] };
    default:
      return state;
  }
};
