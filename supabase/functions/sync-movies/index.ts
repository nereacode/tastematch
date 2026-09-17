import { serve } from "https://deno.land/std/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"


function generateFeatures(movie: any) {

  const genres = movie.genre_ids || []

  const feature = {

    tmdb_id: movie.id,

    emotional: 0,
    intellectual: 0,
    exciting: 0,
    atmospheric: 0,
    slow_paced: 0,
    complex_story: 0,
    open_ending: 0,
    character_driven: 0,

    mbti_tags: [],
    mood_tags: []

  }


  // Action
  if (genres.includes(28)) {
    feature.exciting += 4
  }


  // Adventure
  if (genres.includes(12)) {
    feature.exciting += 3
    feature.atmospheric += 2
  }


  // Animation
  if (genres.includes(16)) {
    feature.atmospheric += 3
    feature.emotional += 2
  }


  // Comedy
  if (genres.includes(35)) {
    feature.emotional += 2
  }


  // Crime
  if (genres.includes(80)) {
    feature.complex_story += 3
    feature.intellectual += 2
  }


  // Documentary
  if (genres.includes(99)) {
    feature.intellectual += 4
  }


  // Drama
  if (genres.includes(18)) {
    feature.emotional += 4
    feature.character_driven += 4
  }


  // Horror
  if (genres.includes(27)) {
    feature.exciting += 4
    feature.atmospheric += 2
  }


  // Mystery
  if (genres.includes(9648)) {
    feature.complex_story += 4
    feature.open_ending += 3
  }


  // Romance
  if (genres.includes(10749)) {
    feature.emotional += 5
  }


  // Science Fiction
  if (genres.includes(878)) {
    feature.intellectual += 4
    feature.complex_story += 3
    feature.atmospheric += 3
  }


  // Thriller
  if (genres.includes(53)) {
    feature.exciting += 4
    feature.complex_story += 3
  }


  return feature
}



serve(async () => {


  const apiKey = Deno.env.get(
    "TMDB_API_KEY"
  )


  const supabaseUrl =
    Deno.env.get(
      "SUPABASE_URL"
    )

  const serviceKey =
    Deno.env.get(
      "SUPABASE_SERVICE_ROLE_KEY"
    )


  if (!apiKey || !supabaseUrl || !serviceKey) {

    return new Response(
      "Missing environment variables",
      {
        status: 500
      }
    )

  }


  const supabase =
    createClient(
      supabaseUrl,
      serviceKey
    )



  const response =
    await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    )


  const data =
    await response.json()



  const movies =
    data.results.map(
      (movie: any) => ({

        tmdb_id:
          movie.id,

        title:
          movie.title,

        overview:
          movie.overview,

        poster_path:
          movie.poster_path,

        backdrop_path:
          movie.backdrop_path,

        release_date:
          movie.release_date || null,


        genres:
          movie.genre_ids,


        vote_average:
          movie.vote_average,


        vote_count:
          movie.vote_count,


        popularity:
          movie.popularity

      })
    )



  const features =
    data.results.map(
      (movie:any)=>
        generateFeatures(movie)
    )



  const movieInsert =
    await supabase
      .from("movies")
      .upsert(
        movies,
        {
          onConflict:
            "tmdb_id"
        }
      )



  if(movieInsert.error){

    return new Response(
      movieInsert.error.message,
      {
        status:500
      }
    )

  }



  const featureInsert =
    await supabase
      .from("movie_features")
      .upsert(
        features,
        {
          onConflict:
            "tmdb_id"
        }
      )



  if(featureInsert.error){

    return new Response(
      featureInsert.error.message,
      {
        status:500
      }
    )

  }



  return new Response(

    JSON.stringify({

      success:true,

      movies:
        movies.length,

      features:
        features.length

    }),

    {

      headers:{
        "Content-Type":
          "application/json"
      }

    }

  )


})

