import type { NextPage } from 'next';
import axios from "axios";
import { useState, useEffect } from "react";

interface Jokes {
    jokes: string | null
}

const Home: NextPage = () => {
    const [ data, setJokes ] = useState<Jokes>({} as Jokes)

    useEffect(() => {
        setJokes({jokes: null})
    }, [])

    const changeJokes = (joke: string) => {
        setJokes(
            {...data, jokes: joke}
        )
    }

    const saveJokes = async () => {
        try {
            const res = await axios.post<Jokes>(
                "http://localhost:8000/jokes/",
                {...data},
            )
            if (res.status != 201) {
                throw "invalid jokes"
            }
        } catch (err) {
            console.error("failed to create a joke:", err)
        }
    }

    const getAllJokes = async () => {
        try {
            const res = await axios.get<Array<Jokes>>(
                "http://localhost:8000/jokes/",
            )
            const data = {
                "status": res.status,
                "header": res.headers,
                "data": res.data
            }
            console.log(data)
        } catch (err) {
            console.log("failed to retrive jokes:", err)
        }
    }

  return (
    <div className="jokesApp">
        <p>
            <input type="text" onChange={(e) => changeJokes(e.target.value)}/>
        </p>
        <p>{JSON.stringify(data)}</p>
        <button onClick={() => saveJokes()}>Submit</button>
        <button onClick={() => getAllJokes()}>Get all jokes</button>
    </div>
  )
}

export default Home
