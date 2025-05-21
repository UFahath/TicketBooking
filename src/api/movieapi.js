 
 const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;
 

    const fetchMovies = async () => {
    let controller = new AbortController();
    let signal = controller.signal;
      let timeOut = setTimeout(() => {
        controller.abort();
      }, 4000);

     
        let response=await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`,
          { signal }
        )
          
            clearTimeout(timeOut);
          if(!response.ok){
            throw new Error(`HTTP response Error ${response.status}`)
          }
          else{
              let data=await response.json();
              return data.results;;
          }  
      }



  
    export default fetchMovies;
   