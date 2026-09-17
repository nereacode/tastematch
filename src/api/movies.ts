import { supabase } from '../lib/supabaseClient'


export type DatabaseMovie = {

  tmdb_id:number

  title:string

  overview:string | null

  poster_path:string | null

  backdrop_path:string | null

  release_date:string | null

  genres:number[]

  vote_average:number

  vote_count:number

  popularity:number

}



export type MovieFeature = {

  tmdb_id:number

  emotional:number

  intellectual:number

  exciting:number

  atmospheric:number

  slow_paced:number

  complex_story:number

  open_ending:number

  character_driven:number

  mbti_tags:string[]

  mood_tags:string[]

}



export type MovieWithFeatures =
  DatabaseMovie & {

    features:MovieFeature | null

  }




export async function getMoviesFromDatabase(){


  const {
    data,
    error
  } =
  await supabase
    .from('movies')
    .select(`
      *,
      movie_features(*)
    `)
    .limit(100)



  if(error){

    console.error(
      'Database movie load error:',
      error
    )

    throw error

  }



  return data.map(
    (movie:any)=>({


      tmdb_id:
        movie.tmdb_id,


      title:
        movie.title,


      overview:
        movie.overview,


      poster_path:
        movie.poster_path,


      backdrop_path:
        movie.backdrop_path,


      release_date:
        movie.release_date,


      genres:
        movie.genres,


      vote_average:
        movie.vote_average,


      vote_count:
        movie.vote_count,


      popularity:
        movie.popularity,



      features:
        Array.isArray(movie.movie_features)

          ? movie.movie_features[0]

          : movie.movie_features


    })

  ) as MovieWithFeatures[]


}