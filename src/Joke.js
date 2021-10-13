import React from "react";

const Joke = (props) => {
    return (
        <div className="Joke">
            <div className="Joke-buttons">
                <i className="fas fa-arrow-up" onClick={props.upvote}></i>
                <span>{props.votes}</span>
                <i className="fas fa-arrow-down" onClick={props.downvote}></i>
            </div>
            <div className="Joke-text">{props.text}</div>
        </div>
    );
};

export default Joke;
