import { createSlice } from '@reduxjs/toolkit'

export const genreOrCategoryName = createSlice({
  name: 'GenreIdOrCategoryName',
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload
      state.searchQuery=''
    },
    searchMovie:(state, action) => {
      state.searchQuery=action.payload
    },
  },
})
export const { selectGenreOrCategory, searchMovie } = genreOrCategoryName.actions
export default genreOrCategoryName.reducer