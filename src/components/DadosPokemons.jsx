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
      <div className="text-center text-white mb-6">
        Carregando dados do Pokémon...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl max-w-sm mx-auto mb-8 relative shadow-lg text-center">
      <button
        onClick={fecharDados}
        className="absolute top-2 right-4 text-red-500 font-bold text-xl"
      >
        X
      </button>

      <h2 className="text-2xl font-bold capitalize text-gray-800">
        {dadoPokemon.name}
      </h2>
      <img
        src={dadoPokemon.sprites.front_default}
        alt={dadoPokemon.name}
        className="mx-auto w-32 h-32 object-contain"
      />
      <div className="text-gray-600 space-y-2 mt-2">
        <p>
          <strong>Experiência Base:</strong> {dadoPokemon.base_experience} XP
        </p>
        <p>
          <strong>Altura:</strong> {dadoPokemon.height / 10} m
        </p>
        <p>
          <strong>Peso:</strong> {dadoPokemon.weight / 10} kg
        </p>
      </div>
    </div>
  );
}
