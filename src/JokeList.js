import React, { useState, useEffect } from "react";
import axios from "axios";

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
                jokes.push(res);
            }
            setDadJokes(jokes);
        }
        getJokes();
    }, []);

    return (
        <div>
            <h1>Dad Jokes</h1>
        </div>
    );
};

export default JokeList;
