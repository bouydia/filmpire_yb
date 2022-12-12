import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY
const page = 1

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: builder => ({
    //* Get All Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    //* Get Popular movies
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get movie by search query
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
        }
        //* Get movie by categoty
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
        }
        //* Get movie by genres
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`
      },
    }),
    //* Get Movie Details
    getMovie: builder.query({
      query: id =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    //* Get user specific lists
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),
    getList: builder.query({
      query: ({listName,accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
    //* Get Actor information
    getActor: builder.query({
      query: actor_id => `/person/${actor_id}?api_key=${tmdbApiKey}`,
    }),
    //* Get Actor Movies
    getMovieByActor: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
})

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMovieByActorQuery,
  useGetListQuery,
} = tmdbApi
