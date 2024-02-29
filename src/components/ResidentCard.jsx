import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import './styles/residentCard.css'

const ResidentCard = ({url}) => {
    const [resident , getResident] = useFetch();
    //Cuando recibes una url debo hacer otro consumo de api
    useEffect(()=>{
        getResident(url);
        console.log(url)
    },[]);
  return (
    <article className='resident'>
        <figure className='resident_photo'>
            <img src={resident?.image} alt="residentimage"></img>
           
            <figcaption className='resident_status'>
                <div className={`resident_circle ${resident?.status}`}></div>
                <p>{resident?.status}</p>
            </figcaption>
            <h3 className='resident_name'>{resident?.name}</h3>
            <hr />
            <ul className='resident_list'>
                <li className='resident_item'><span>Specie</span> <span>{resident?.species}</span></li>
                <li className='resident_item'><span>Origin</span> <span>{resident?.origin.name}</span></li>
                <li className='resident_item'><span>Eppisodes where appear</span> <span>{resident?.episode.length}</span></li>
            </ul>
        </figure>
    </article>
  )
}

export default ResidentCard;