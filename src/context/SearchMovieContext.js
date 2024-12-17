import {createContext} from 'react'

const SearchMovieContext = createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default SearchMovieContext
