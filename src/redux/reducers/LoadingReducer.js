import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstant";

const initialState = {
  isLoading: false,
};

export const LoadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DISPLAY_LOADING: {
      state.isLoading = true;
      return { ...state };
    }

    case HIDE_LOADING: {
      state.isLoading = false;
      return { ...state };
    }

    default:
      return state;
  }
};
