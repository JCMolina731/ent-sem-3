import Axios  from "axios";
import { useState } from "react"


const useFetch = () => {
  const [apiData, setApiData] = useState();
    //agregar estados para cuando la pagina este cargando
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

  const getApi = url =>{
    Axios.get(url)
        .then(res => {
            setHasError(false);
            setApiData(res.data);
        })
        .catch(err => {
            setHasError(true);
            console.log(err)
        })
        .finally(() => {
            setIsLoading(false);
        });
  }
    return [apiData, getApi, isLoading, hasError];
}

export default useFetch;
