import React, { useEffect } from "react";
import axios from "axios";

const JokeList = () => {
    useEffect(() => {
        async function getData() {
            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" },
            });
            console.log(res.data.joke);
        }
        getData();
    }, []);

    return (
        <div>
            <h1>Dad Jokes</h1>
        </div>
    );
};

export default JokeList;
