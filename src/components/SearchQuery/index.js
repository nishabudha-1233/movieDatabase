import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import NavBar from '../NavBar'
import SearchMovieContext from '../../context/SearchMovieContext'
import './index.css'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div>
      <h1>No results found</h1>
      <p>Don not get worried. Try to Search again</p>
    </div>
  )

  const renderMovieList = searchResponse => {
    const {result} = searchResponse
    if (!result.length) {
      return renderEmptyView()
    }
    return (
      <ul className="row p-0 me-0 mt-3">
        {result.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }
  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultView = value => {
    const {searchResponse, apiStatus} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMovieList(searchResponse)
      default:
        return renderEmptyView()
    }
  }
  return (
    <SearchMovieContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value
        return (
          <>
            <NavBar />
            <div>{renderSearchResultView(value)}</div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onTriggerSearchingQuery}
            />
          </>
        )
      }}
    </SearchMovieContext.Consumer>
  )
}
export default SearchQuery
