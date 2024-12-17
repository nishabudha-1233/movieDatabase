import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'
import './index.css'

class TopRated extends Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {},
  }

  componentDidMount() {
    this.getTopRatedMovieResponse()
  }

  getUpdateData = responseData => ({
    totalPages: responseData.total_pages,
    totalResult: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/original/${eachMovie.poster_path}`,

      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getTopRatedMovieResponse = async (page = 1) => {
    console.log('hello')
    const API_KEY = '5c2e543d48d378859d46996e12acf690'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    const newData = this.getUpdateData(data)
    console.log('Processed Data:', newData)

    this.setState({isLoading: false, topRatedMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div>
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMovieList = () => {
    const {topRatedMovieResponse} = this.state
    const {results} = topRatedMovieResponse
    return (
      <ul>
        <h1>Top Rated</h1>
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovieResponse} = this.state
    return (
      <>
        <NavBar />

        <div>
          {isLoading ? this.renderLoadingView() : this.renderPopularMovieList()}
        </div>
        <Pagination
          totalPages={topRatedMovieResponse.totalPages}
          apiCallback={this.getTopRatedMovieResponse}
        />
      </>
    )
  }
}
export default TopRated
