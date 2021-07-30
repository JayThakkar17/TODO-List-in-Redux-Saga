import { all } from "redux-saga/effects";
import userSagas from "./userSagas";

export default function* rootSaga() {
  yield all([userSagas()]);
}
