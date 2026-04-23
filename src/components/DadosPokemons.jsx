import { useState, useEffect } from "react";

export default function DadosPokemons({ idDoPokemon, fecharDados }) {
  const [dadoPokemon, setDadoPokemon] = useState(null);

  useEffect(() => {
    async function verDadosPokemon() {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idDoPokemon}`,
      );
      const resultado = await resposta.json();

      setDadoPokemon(resultado);
    }

    verDadosPokemon();
  }, [idDoPokemon]);

  if (!dadoPokemon) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="text-white text-xl font-bold animate-pulse">
          Carregando dados do Pokémon...
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={fecharDados}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-sm relative shadow-2xl text-center transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={fecharDados}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 font-bold text-xl transition-colors"
        >
          X
        </button>

        <h2 className="text-3xl font-bold capitalize text-gray-800 mt-2">
          {dadoPokemon.name}
        </h2>

        <img
          src={dadoPokemon.sprites.front_default}
          alt={dadoPokemon.name}
          className="mx-auto w-40 h-40 object-contain drop-shadow-md"
        />

        <div className="text-gray-600 space-y-3 mt-4 bg-gray-50 p-4 rounded-lg">
          <p className="flex justify-between">
            <strong>Experiência Base:</strong>
            <span>{dadoPokemon.base_experience} XP</span>
          </p>
          <p className="flex justify-between">
            <strong>Altura:</strong>
            <span>{dadoPokemon.height / 10} m</span>
          </p>
          <p className="flex justify-between">
            <strong>Peso:</strong>
            <span>{dadoPokemon.weight / 10} kg</span>
          </p>
        </div>
      </div>
    </div>
  );
}
