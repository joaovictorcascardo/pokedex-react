import { useEffect, useState } from "react";
import DadosPokemons from "./DadosPokemons";

export default function PokeApi() {
  const [pokemon, setPokemons] = useState([]);
  const [carregouApi, setCarregouApi] = useState(true);

  const [idSelecionado, setIdSelecionado] = useState(null);

  useEffect(() => {
    async function buscarPokemon() {
      try {
        const buscandoPokemon = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50",
        );
        const pokemonsDados = await buscandoPokemon.json();
        setPokemons(pokemonsDados.results);
        setCarregouApi(false);
      } catch (erro) {
        console.log(erro);
      }
    }
    buscarPokemon();
  }, []);

  return (
    <div className="bg-[url(https://i.pinimg.com/originals/2b/3b/04/2b3b04771ccca26c3dd96d781b0117ca.jpg)] bg-black/60 bg-blend-multiply mx-auto p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">
        Minha Pokédex
      </h1>

      {idSelecionado && (
        <DadosPokemons
          idDoPokemon={idSelecionado}
          fecharDados={() => setIdSelecionado(null)}
        />
      )}

      {carregouApi ? (
        <p className="text-center text-lg text-gray-100">
          Procurando Pokémons no mato alto...
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {pokemon.map((poke) => {
            const idDoPokemon = poke.url.split("/")[6];
            const linkDaFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idDoPokemon}.png`;

            return (
              <li
                key={poke.name}
                className="bg-gray-100 rounded-xl p-4 shadow-sm flex flex-col items-center hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <img
                  src={linkDaFoto}
                  alt={poke.name}
                  className="w-24 h-24 object-contain"
                />
                <h3 className="capitalize mt-3 font-semibold text-gray-700 text-lg">
                  {poke.name}
                </h3>
                <button
                  className="bg-stone-700 text-white p-2 rounded-md mt-3 w-full"
                  onClick={() => setIdSelecionado(idDoPokemon)}
                >
                  Ver dados
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
