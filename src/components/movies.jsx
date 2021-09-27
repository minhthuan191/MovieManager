import React, { Component } from 'react';
import {getMovies} from "../services/fakeMovieService";
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './common/movieTable';
import _ from "lodash"
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';

class Movie extends Component {
    state = { 
        movies :[], 
        genres: [],
        currentPage: 1,
        pageSize : 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn:{path:"title", order:"asc"}
    }

    componentDidMount(){
        const genres = [{_id: "",name:'All Genres'},...getGenres()]
        this.setState({movies: getMovies(), genres: genres})
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index]={...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies})
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter( m => m._id !== movie._id);
        this.setState({ movies: movies });
    };

    handlePageChange = page =>{
        this.setState({currentPage : page});
    }

    handleSearch = query =>{
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }
    handleGenresSelected = genre =>{
        this.setState({selectedGenre: genre, searchQuery:"", currentPage: 1})
    }

    handleSort = sortColumn =>{
        this.setState({sortColumn})
    }

    getPagedData = () => {
        const{
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            searchQuery,
            movies: allMovies
        } = this.state;

        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return{totalCount: filtered.length, data: movies};
    }

    render() { 
        const {length:count}= this.state.movies;
        const {pageSize, currentPage, sortColumn, searchQuery, genres, selectedGenre} = this.state;
        if(count === 0) return <p>There is no movie in database</p>
        const { totalCount, data: movies } = this.getPagedData();
        return (
        <div className="row"> 
            <div className="col-3">
                <ListGroup 
                    items={genres} 
                    selectedItem ={selectedGenre}
                    onItemSelect={this.handleGenresSelected}
                />
            </div>
            <div className="col">
                <Link className="btn btn-primary" to="/movies/new" style={{marginBottom: 20}}>New Movie</Link>
                <p>Showing {totalCount} movie in the database</p>
                <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                <MoviesTable 
                    onLike={this.handleLike} 
                    onDelete={this.handleDelete} 
                    movies={movies}
                    onSort ={this.handleSort}
                    sortColumn = {sortColumn}
                />
                <Pagination 
                    itemsCount ={totalCount}
                    pageSize ={pageSize}
                    currentPage ={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </div>
            
        </div>
        );
    }
}

export default Movie;