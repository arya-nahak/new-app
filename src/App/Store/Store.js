

import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import Reducer from "../../Features/Customer/Reducer/Reducer"

const middleware = [thunk]

const rootReducer = combineReducers({
    user:Reducer,
})

const Store = createStore(rootReducer,applyMiddleware(...middleware))

export default Store