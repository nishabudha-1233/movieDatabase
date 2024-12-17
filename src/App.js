import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchQuery from './components/SearchQuery'
import SearchMovieContext from './context/SearchMovieContext'
import './App.css'

const API_KEY = '5c2e543d48d378859d46996e12acf690'

const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdateData = responseData => ({
    totalPages: responseData.total_pages,
    totalResult: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/original/${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    console.log('search input Hello')
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    setSearchResponse(getUpdateData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <SearchMovieContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="App d-flex flex-column">
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/search" component={SearchQuery} />
        </Switch>
      </div>
    </SearchMovieContext.Provider>
  )
}
export default App
