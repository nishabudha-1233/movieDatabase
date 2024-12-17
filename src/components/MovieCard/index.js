import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  return (
    <li className="col-12 col-sm-6 col-lg-2 mb-3 d-flex flex-column">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <div>
        <h1>{title}</h1>
        <p>Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="mt-auto align-self-center">
        <button type="button">View Details</button>
      </Link>
    </li>
  )
}

export default MovieCard
