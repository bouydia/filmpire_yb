import { configureStore } from "@reduxjs/toolkit"
import { tmdbApi } from "../services/TMDB"
import genreOrCategoryReducer from '../features/currentgenreOrCategory'
import useReducer from '../features/auth'

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentgenreOrCategory: genreOrCategoryReducer,
    user:useReducer
  },
})