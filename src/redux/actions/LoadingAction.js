import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstant";

export const displayLoadingAction = () => ({
  type: DISPLAY_LOADING,
});

export const hideLoadingAction = () => ({
  type: HIDE_LOADING,
});
