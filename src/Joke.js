import React from "react";
import "./Joke.css";

const Joke = (props) => {
    return (
        <div className="Joke">
            <div className="Joke-buttons">
                <i className="fas fa-arrow-up" onClick={props.upvote}></i>
                <span className="Joke-vote">{props.votes}</span>
                <i className="fas fa-arrow-down" onClick={props.downvote}></i>
            </div>
            <div className="Joke-text">{props.text}</div>
            <div className="Joke-smiley">
                <i
                    className="em em-rolling_on_the_floor_laughing"
                    aria-labelledby="Rotfl"
                ></i>
            </div>
        </div>
    );
};

export default Joke;
