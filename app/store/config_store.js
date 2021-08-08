import { createStore, combineReducers } from "redux";
import {
  dataReducer,
  featured_Reducer,
  filter_Reducer,
} from "./reducers/data_reducer";
//all reducers are combined here
const rootReducer = combineReducers({
  data: dataReducer,
  featured: featured_Reducer,
  filter: filter_Reducer,
});
const configStore = () => {
  return createStore(rootReducer);
};
export default configStore;
