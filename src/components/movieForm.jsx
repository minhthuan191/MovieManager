import Joi from 'joi-browser';
import React from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import Form from './common/form';

class MovieForm extends Form {
    state = {
        data:{
            title:"",
            genreId:"",
            numberInStock:"",
            dailyRentalRate:"",
        },
        genres:[],
        errors:{}
    }
    schema = {
        _id: Joi.string(),
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().integer().required(),
        dailyRentalRate: Joi.number().min(0).max(10).required(),
    }
    componentDidMount() {
        const genres = getGenres();
        this.setState({genres});

        const movieId = this.props.match.params.id;
        if( movieId === "new") return;

        const movie = getMovie(movieId);
        if(!movie) return this.props.history.replace("/not-found");
        
        this.setState({data : this.mapToViewModel(movie)});
    }

    mapToViewModel(movie){
        return{
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
        }
    }

    doSubmit = () =>{
        saveMovie(this.state.data);

        this.props.history.push("/movies");
    }
    render() { 
        return ( 
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;