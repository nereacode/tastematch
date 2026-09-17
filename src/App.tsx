import { useEffect, useState } from 'react'
import './App.css'

import Auth from './components/Auth'
import Home from './components/Home'
import MyList from './components/MyList'
import Results from './components/Results'
import Quiz from './components/Quiz'

import {
  getMoviesFromDatabase,
  type MovieWithFeatures,
} from './api/movies'

import { supabase } from './lib/supabaseClient'


type Step =
  | 'home'
  | 'mbti'
  | 'quiz'
  | 'mood'
  | 'results'
  | 'mylist'


type TasteScores = {
  emotional: number
  intellectual: number
  exciting: number
  atmospheric: number
  slowPaced: number
  complexStory: number
  openEnding: number
  characterDriven: number
}


type MoodScores = {
  comfort: number
  emotional: number
  intellectual: number
  exciting: number
  atmospheric: number
  complexity: number
}


type Answer = {
  text: string
  scores: Partial<
    TasteScores | MoodScores
  >
}


type Question = {
  question: string
  answers: Answer[]
}


const initialTasteScores: TasteScores = {
  emotional: 0,
  intellectual: 0,
  exciting: 0,
  atmospheric: 0,
  slowPaced: 0,
  complexStory: 0,
  openEnding: 0,
  characterDriven: 0,
}


const initialMoodScores: MoodScores = {
  comfort: 0,
  emotional: 0,
  intellectual: 0,
  exciting: 0,
  atmospheric: 0,
  complexity: 0,
}

function calculateMatchScore(
  userScores: TasteScores,
  movieFeatures: any,
) {

  const weights = [
    [
      'emotional',
      'emotional',
    ],
    [
      'intellectual',
      'intellectual',
    ],
    [
      'exciting',
      'exciting',
    ],
    [
      'atmospheric',
      'atmospheric',
    ],
    [
      'slowPaced',
      'slow_paced',
    ],
    [
      'complexStory',
      'complex_story',
    ],
    [
      'openEnding',
      'open_ending',
    ],
    [
      'characterDriven',
      'character_driven',
    ],
  ]


  let userTotal = 0
  let matchTotal = 0


  weights.forEach(
    ([userKey, movieKey]) => {

      const userValue =
        userScores[
          userKey as keyof TasteScores
        ] || 0


      const movieValue =
        movieFeatures?.[
          movieKey
        ] || 0


      userTotal += userValue

      matchTotal += Math.min(
        userValue,
        movieValue,
      )
    },
  )


  if(userTotal === 0){
    return 0
  }


  return Math.round(
    (
      matchTotal /
      userTotal
    ) * 100
  )

}



function getMatchingPreferences(
  userScores: TasteScores,
  movieFeatures: any,
){

  const labels:any = {

    emotional:
      'Emotional',

    intellectual:
      'Intellectual',

    exciting:
      'Exciting',

    atmospheric:
      'Atmospheric',

    slowPaced:
      'Slow-paced',

    complexStory:
      'Complex story',

    openEnding:
      'Open endings',

    characterDriven:
      'Character-driven',

  }


  const map:any = {

    emotional:
      'emotional',

    intellectual:
      'intellectual',

    exciting:
      'exciting',

    atmospheric:
      'atmospheric',

    slowPaced:
      'slow_paced',

    complexStory:
      'complex_story',

    openEnding:
      'open_ending',

    characterDriven:
      'character_driven',

  }


  return Object.keys(labels)

    .sort(
      (a,b)=>{

        const scoreA =
          Math.min(
            userScores[
              a as keyof TasteScores
            ] || 0,

            movieFeatures?.[
              map[a]
            ] || 0
          )


        const scoreB =
          Math.min(
            userScores[
              b as keyof TasteScores
            ] || 0,

            movieFeatures?.[
              map[b]
            ] || 0
          )


        return scoreB-scoreA

      }
    )

    .slice(0,3)

    .map(
      key=>labels[key]
    )

}

function App() {

  const [isLoggedIn,setIsLoggedIn] =
    useState(false)


  const [authLoading,setAuthLoading] =
    useState(true)


  const [step,setStep] =
    useState<Step>('home')


  const [mbti,setMbti] =
    useState('')


  const [questionIndex,setQuestionIndex] =
    useState(0)


  const [scores,setScores] =
    useState<TasteScores>(
      initialTasteScores
    )


  const [moodScores,setMoodScores] =
    useState<MoodScores>(
      initialMoodScores
    )


  // ⭐ 改成数据库电影
  const [movies,setMovies] =
    useState<MovieWithFeatures[]>([])


  const [watchedMovies,setWatchedMovies] =
    useState<number[]>([])


  const [dismissedMovies,setDismissedMovies] =
    useState<number[]>([])


  const [interestedMovies,setInterestedMovies] =
    useState<number[]>([])



  /*
  --------------------------
  登录检测
  --------------------------
  */


  useEffect(()=>{

    async function checkSession(){

      const {
        data:{
          session
        }
      } =
      await supabase.auth.getSession()


      setIsLoggedIn(
        !!session
      )


      setAuthLoading(false)

    }


    checkSession()


    const {
      data:{
        subscription
      }
    } =
    supabase.auth.onAuthStateChange(
      (_event,session)=>{

        setIsLoggedIn(
          !!session
        )

      }
    )


    return ()=>{

      subscription.unsubscribe()

    }


  },[])




  /*
  --------------------------
  从 Supabase movies 表读取电影
  --------------------------
  */


  useEffect(()=>{


    async function loadMovies(){


      try{


        const data =
          await getMoviesFromDatabase()


        console.log(
          "Database movies:",
          data
        )


        setMovies(data)


      }catch(error){


        console.error(
          error
        )


      }


    }


    loadMovies()


  },[])




  /*
  --------------------------
  推荐算法
  --------------------------
  */


  function getRecommendations(){


    return movies

      .filter(movie=>{


        return (

          !watchedMovies.includes(
            movie.tmdb_id
          )

          &&

          !dismissedMovies.includes(
            movie.tmdb_id
          )

        )


      })


      .map(movie=>{


        const matchScore =
          calculateMatchScore(

            scores,

            movie.features

          )



        const matchingPreferences =
          getMatchingPreferences(

            scores,

            movie.features

          )



        return {


          movie,


          matchScore,


          matchingPreferences


        }


      })


      .sort(
        (a,b)=>
          b.matchScore -
          a.matchScore
      )


      .slice(0,30)

  }
  