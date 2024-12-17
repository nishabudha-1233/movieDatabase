import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'
import './index.css'

class Popular extends Component {
  state = {
    isLoading: true,
    popularMovieResponse: {},
  }

  componentDidMount() {
    this.getPopularMovieResponse()
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

  getPopularMovieResponse = async (page = 1) => {
    console.log('hello')
    const API_KEY = '5c2e543d48d378859d46996e12acf690'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    const newData = this.getUpdateData(data)
    this.setState({isLoading: false, popularMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div>
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMovieList = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse
    return (
      <ul>
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state
    return (
      <>
        <NavBar />
        <div>
          {isLoading ? this.renderLoadingView() : this.renderPopularMovieList()}
        </div>
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallback={this.popularMovieResponse}
        />
      </>
    )
  }
}
export default Popular
