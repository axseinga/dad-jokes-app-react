import React, { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import "./JokeList.css";
import Joke from "./Joke";

const JokeList = () => {
    const [dadJokes, setDadJokes] = useState(
        JSON.parse(window.localStorage.getItem("jokes")) || []
    );
    const [isLoading, setIsLoading] = useState(false);

    const numJokesToGet = 10;

    function getData() {
        const promise = fetch("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" },
        });
        return promise
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .then((data) => {
                const joke = data.joke;
                return joke;
            })
            .catch((err) => console.log(err));
    }

    async function getJokes() {
        let jokes = [];
        while (jokes.length < numJokesToGet) {
            const res = await getData();
            jokes.push({ id: uuid4(), text: res, vote: 0 });
        }
        const newDadJokes = dadJokes.concat(jokes);
        setDadJokes(newDadJokes);
        setIsLoading(false);
        window.localStorage.setItem("jokes", JSON.stringify(newDadJokes));
    }

    useEffect(() => {
        if (dadJokes.length === 0) getJokes();
    }, []);

    const handleVote = (id, delta) => {
        let updatedDadJokes = dadJokes.map((d) => {
            if (d.id === id) {
                return { ...d, vote: d.vote + delta };
            } else return { ...d };
        });
        setDadJokes(updatedDadJokes);
        window.localStorage.setItem("jokes", JSON.stringify(updatedDadJokes));
    };

    const handleClick = () => {
        setIsLoading(true);
        getJokes();
    };

    return isLoading ? (
        <div className="spinner">
            <i className="far fa-8x fa-laugh fa-spin" />
            <h1 className="JokeList-title JokeList-spinner-text">Loading...</h1>
        </div>
    ) : (
        <div className="JokeList">
            <div className="JokeList-sidebar">
                <h1 className="JokeList-title">
                    <span>Dad </span> Jokes
                </h1>
                <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                <button className="JokeList-getmore" onClick={handleClick}>
                    New Jokes
                </button>
            </div>
            <div className="JokeList-jokes">
                {dadJokes.map((j) => {
                    return (
                        <Joke
                            key={j.id}
                            text={j.text}
                            votes={j.vote}
                            upvote={() => {
                                handleVote(j.id, 1);
                            }}
                            downvote={() => {
                                handleVote(j.id, -1);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default JokeList;
