import { createContext, useReducer, useEffect } from "react"

// Initial state
const initialState = {
  movies: [],
  trending: [],
  favorites: [],
  lastSearched: null,
  loading: false,
  error: null,
}

// Create context
export const MovieContext = createContext(initialState)

// Reducer function
const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        loading: false,
      }
    case "SET_TRENDING":
      return {
        ...state,
        trending: action.payload,
        loading: false,
      }
    case "SET_LAST_SEARCHED":
      return {
        ...state,
        lastSearched: action.payload,
      }
    case "ADD_FAVORITE":
      // Prevent duplicates
      if (state.favorites.some((movie) => movie.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((movie) => movie.id !== action.payload),
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

// Provider component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState)

  // Load favorites and last searched movie from localStorage on initial render
  useEffect(() => {
    const favorites = localStorage.getItem("favorites")
    const lastSearched = localStorage.getItem("lastSearched")

    if (favorites) {
      dispatch({
        type: "SET_FAVORITES",
        payload: JSON.parse(favorites),
      })
    }

    if (lastSearched) {
      dispatch({
        type: "SET_LAST_SEARCHED",
        payload: JSON.parse(lastSearched),
      })
    }
  }, [])

  // Save favorites and last searched movie to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites))
  }, [state.favorites])

  useEffect(() => {
    if (state.lastSearched) {
      localStorage.setItem("lastSearched", JSON.stringify(state.lastSearched))
    }
  }, [state.lastSearched])

  return (
    <MovieContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
