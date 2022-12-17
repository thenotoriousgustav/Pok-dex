import axios from "axios";
import { useState, useEffect } from "react";

export default function Card() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url);
      // console.log(res.data.results);
      getPokemon(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
      setLoading(false);
    };
    getData();
  }, [url]);

  const getPokemon = async (res) => {
    res.filter(async (data) => {
      const result = await axios.get(data.url);
      console.log(result.data);
      setPokemon((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  return (
    <section>
      <h1 className='text-5xl'>Pokedex</h1>
      <p className='text-xl text-gray-500'>
        Search for a Pokemon by name or using it's National Pokedex number.
      </p>
      <input
        type='search'
        placeholder='Search Pokemon...'
        className='bg-gray-200 rounded-lg p-3 mt-4 w-full md:w-72 lg:w-80'
      ></input>

      <div className='grid lg:grid-cols-5 gap-4 mt-4 md:grid-cols-3 grid-cols-2'>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          pokemon.map((data, id) => {
            return (
              <div key={id} className='bg-blue-200 rounded-lg '>
                <img
                  src={data.sprites.front_default}
                  alt={data.name}
                  className='w-52 object-cover'
                ></img>
                <div className='p-2'>
                  <h2 className='text-xl md:text-2xl'>{data.name}</h2>
                  <p className='text-sm text-gray-500'>
                    {data.types[0].type.name}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className='flex justify-end mt-4'>
        {next && (
          <button
            onClick={() => {
              setPokemon([]);
              setUrl(prev);
            }}
            className='rounded-lg bg-red-400 p-2 mr-4'
          >
            Previous
          </button>
        )}

        {next && (
          <button
            onClick={() => {
              setPokemon([]);
              setUrl(next);
            }}
            className='rounded-lg bg-red-400 p-2'
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
}
