import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';




function App() {
const [pokemon, setPokemon] = useState([]);


const getData = async () =>{
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon')
     //Esto me devolvio un array con nombre y url del pokemon, recuenden que el fetch por defecto es un GET
    const data = await res.json()
   //Con lo siguiente devuelvo un nuevo array solo con las urls
     const pokes = data.results.map(x => x.url)
   
     //Promise all hace que cuando tengo mas de una promesa para resolver cuando hago la request al back
     // NO devuelve nada hasta que todas esten resueltas, esto era lo que fallaba y hacia que el estado se rompa
     //Generalmente van a hacer una llamada que no tengan que recurrir a Promise.All, ya van a tener todos los valores formateados
     Promise.all(pokes.map(url =>
      fetch(url).then(resp => resp.json()))).then(pokes => {setPokemon(pokes)})
  } catch (err) {
    console.log(err)
  }
}


//Lo mismo de arriba pero con promesas solamente
// const getData = ()=>{
//   const res = fetch('https://pokeapi.co/api/v2/pokemon')
//   .then(res => res.json()).then(data => console.log(data.results)).catch(err => console.log(err))
  
// }

useEffect(() => {
 getData()
}, []);

useEffect(() => {
  console.log(pokemon);
 }, [pokemon]);
  return (
    <div className="App">
        <div style={{display : 'flex', flexWrap: 'wrap', width: '100%', height: 'fit-content', gap: '1rem', padding: '1rem'}}>
        {pokemon && pokemon.map(x =>
          <div style={{display : 'flex', flexDirection: 'column', width: '200px', height: 'fit-content', gap: '1rem', border :'solid 1px black'}}>
                <p>Nombre: {x.name}</p>
                <p>Id: {x.id}</p>
                <img src={x.sprites.front_default} alt="" />
          </div>
        )
        }
        </div>
    </div>
  );
}

export default App;
