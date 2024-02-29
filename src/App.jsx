import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';

function App() {
  //const [location, setlocation] = useState();
  const [finder, setFinder] = useState(Math.floor(Math.random()*126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(() => {

    //const randomLocation = Math.floor(Math.random()*126 + 1);
   const url = `https://rickandmortyapi.com/api/location/${finder}`;
   getLocation(url);
  }, [finder]);

  const textImput = useRef();
  //funcion para el evento submit

  const handleSubmit = event => {
    //para que no se recargue la pagina se recarge se usa el event.preventdefault
    event.preventDefault();
    setFinder(textImput.current.value.trim());

  }

  const quantity = 5;
  const second = currentPage * quantity;
  const first = second - quantity;
  const residentsPart = location && location.residents.slice(first,second);
  const totalPages = Math.floor(location && location.residents.length / quantity)+ 1;

  return (
    
    <div className='app'>
      {
      isLoading ?
        <h2>Loading...</h2>
        :
        <>
            <h1>Rick and Morty</h1>
          <form className='app_form' onSubmit={handleSubmit}>
            <input 
              type='number'
              ref={textImput}
              placeholder='type a number(1 to 126)'
              className='app_text'
              >

            </input>
            <button className='app_btn'>Search</button>
          </form>
          {
            hasError || finder=== '0' ?
              <h2>this location do not exist</h2>
              :
              <>
                <LocationCard 
                  location = {location}
                />
                <div className='app_container'>
                {
                  //fragmentar el arreglo para paginacion
                  residentsPart.map(resident => (<ResidentCard 
                  key={resident}
                  url = {resident}
                  />
                  ))
                }
                </div>
                <Pagination 
                  currentPage = {currentPage}
                  setCurrentPage= {setCurrentPage}
                  totalPages = {totalPages}
                  
                />
              </>
          }
          
        </>
      }
      
    </div>
  )
}

export default App
