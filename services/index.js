import AXIOS from "axios"

const API_KEY = '61788480ad72fad64663082169c9ad47'
const URL = 'https://api.themoviedb.org/3'
export const IMAGE_PATH_LOW = 'https://image.tmdb.org/t/p/w500'
export const IMAGE_PATH_HIGH = 'https://image.tmdb.org/t/p/original'

// Get popular movies
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const getPopularMovies = async (page) => {
    const res = await AXIOS.get(`${URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
    return res
}

//Currently Airing TV Shows
//https://api.themoviedb.org/3/tv/on_the_air?api_key=<<api_key>>&language=en-US&page=1
export const getTVOnTheAir = async (page) => {
    const res = await AXIOS.get(`${URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`)
    return res
}

//trending movies
//https://api.themoviedb.org/3/trending/movie/day?api_key=<<api_key>>
export const getTrendingMovies = async (page) => {
    const res = await AXIOS.get(`${URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`)
    return res
}

//https://api.themoviedb.org/3/person/popular?api_key=<<api_key>>&language=en-US&page=1
export const getPopularPeople = async (page) => {
    const res = await AXIOS.get(`${URL}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
    return res
}

//Get details tv or movie
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
export const getDetails = async (type, id) => {
    const res = await AXIOS.get(`${URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`)
    return res
}

//Get videos 
//https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
export const getVideos = async (type, id) => {
    const res = await AXIOS.get(`${URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`)
    return res
}

//get seasons
//https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=<<api_key>>&language=en-US
export const getSeasons = async (tv_id, season_number) => {
    const res = await AXIOS.get(`${URL}/tv/${tv_id}/season/${season_number}?api_key=${API_KEY}&language=en-US`)
    return res
}

//Get Movie & TV Credits
//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
//https://api.themoviedb.org/3/tv/{tv_id}/credits?api_key=<<api_key>>&language=en-US
export const getCredits = async (type, id) => {
    const res = await AXIOS.get(`${URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`)
    return res
}

//Get Details People
//https://api.themoviedb.org/3/person/{person_id}?api_key=<<api_key>>&language=en-US
export const getDetailsPeople = async (id) => {
    const res = await AXIOS.get(`${URL}/person/${id}?api_key=${API_KEY}&language=en-US`)
    return res
}

//Get movie by cast id
//https://api.themoviedb.org/3/person/2524/movie_credits?api_key=61788480ad72fad64663082169c9ad47&language=en-US
export const getMoviesByCastID = async (id) => {
    const res = await AXIOS.get(`${URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
    return res
}

//Search Movies
//https://api.themoviedb.org/3/search/movie?api_key=61788480ad72fad64663082169c9ad47&language=en-US&query=Hello+Stranger&page=1&include_adult=true
export const searchMoviesAndTV = async (type, query) => {
    const res = await AXIOS.get(`${URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
    return res
}

//Get Movie/TV Genre
//https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
export const getGenre = async (type) => {
    const res = await AXIOS.get(`${URL}/genre/${type}/list?api_key=${API_KEY}&language=en-US`)
    return res
}

//Get Movies/TV by genre ID
//https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
export const getMovieAndTVByID = async (type, id, page) => {
    console.log(`${URL}/discover/${type}?api_key=${API_KEY}&with_genres=${id}&page=${page}`)
    const res = await AXIOS.get(`${URL}/discover/${type}?api_key=${API_KEY}&with_genres=${id}&page=${page}`)
    return res
}