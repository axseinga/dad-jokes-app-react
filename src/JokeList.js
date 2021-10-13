import React, { useState, useEffect } from "react";
import "./JokeList.css";

const JokeList = () => {
    const [dadJokes, setDadJokes] = useState([]);
    const numJokesToGet = 10;

    useEffect(() => {
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
                jokes.push({ joke: res, vote: 0 });
            }
            setDadJokes(jokes);
        }
        getJokes();
    }, []);

    return (
        <div className="JokeList">
            <div className="JokeList-sidebar">
                <h1 className="JokeList-title">
                    <span>Dad </span> Jokes
                </h1>
                <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                <button className="JokeList-getmore">New Jokes</button>
            </div>
            <div className="JokeList-jokes">
                {dadJokes.map((j) => {
                    return <div>{j.joke}</div>;
                })}
            </div>
        </div>
    );
};

export default JokeList;
