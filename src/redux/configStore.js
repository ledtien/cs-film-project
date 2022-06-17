import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { QuanLyFilmReducer } from "./reducers/QuanLyFilmReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";

const rootReducer = combineReducers({
  CarouselReducer,
  QuanLyFilmReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  LoadingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
