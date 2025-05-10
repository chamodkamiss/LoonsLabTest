import { createContext, useReducer, useEffect } from "react"

// Get initial favorites from localStorage
const getFavoritesFromStorage = () => {
  try {
    const storedFavorites = localStorage.getItem('favorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  } catch (error) {
    console.error('Error loading favorites:', error)
    return []
  }
}

// Initial state with stored favorites
const initialState = {
  movies: [],
  trending: [],
  favorites: getFavoritesFromStorage(), // Initialize from localStorage
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
    case "ADD_FAVORITE": {
      if (state.favorites.some((movie) => movie.id === action.payload.id)) {
        return state
      }
      const newFavorites = [...state.favorites, action.payload]
      localStorage.setItem('favorites', JSON.stringify(newFavorites)) // Save to localStorage
      return {
        ...state,
        favorites: newFavorites,
      }
    }
    case "REMOVE_FAVORITE": {
      const updatedFavorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      )
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)) // Save to localStorage
      return {
        ...state,
        favorites: updatedFavorites,
      }
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
    const lastSearched = localStorage.getItem("lastSearched")

    if (lastSearched) {
      dispatch({
        type: "SET_LAST_SEARCHED",
        payload: JSON.parse(lastSearched),
      })
    }
  }, [])

  // Optional: Sync favorites with localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    } catch (error) {
      console.error('Error saving favorites:', error)
    }
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
