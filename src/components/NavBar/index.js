import {Link, withRouter} from 'react-router-dom'
import SearchMovieContext from '../../context/SearchMovieContext'
import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <SearchMovieContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push('/search')
        }

        return (
          <div>
            <input
              type="text"
              className="me-2 search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMovieContext.Consumer>
  )
  return (
    <nav className="nave-container d-flex align-item-center p-3">
      <div>
        <h1>movieDB</h1>
      </div>
      <div className="ms-auto d-flex align-item-center ">
        <ul className="order-1 d-flex align-item-center p-0 mb-3 nav-items-list">
          <li className="nav-item">
            <Link to="/">Popular</Link>
          </li>
          <li className="nav-item">
            <Link to="/top-rated">TopRated</Link>
          </li>
          <li className="nav-item">
            <Link to="/upcoming">Upcoming</Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}
export default withRouter(NavBar)
