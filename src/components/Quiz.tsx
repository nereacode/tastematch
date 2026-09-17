
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
  scores: Partial<TasteScores | MoodScores>
}

type Question = {
  question: string
  answers: Answer[]
}

type QuizProps = {
  mode: 'mbti' | 'quiz' | 'mood'
  questionIndex: number
  questions: Question[]
  onChooseMbti: (type: string) => void
  onChooseAnswer: (answer: Answer) => void
  onBackHome: () => void
}

function Quiz({
  mode,
  questionIndex,
  questions,
  onChooseMbti,
  onChooseAnswer,
  onBackHome,
}: QuizProps) {
  if (mode === 'mbti') {
    return (
      <main className="quiz-page">
        <section className="quiz-container">
          <p className="eyebrow">
            TASTEMATCH / 02
          </p>

          <h1>
            WHAT'S YOUR
            <br />
            MBTI TYPE?
          </h1>

          <div className="mbti-grid">
            {[
              'INTJ',
              'INTP',
              'ENTJ',
              'ENTP',
              'INFJ',
              'INFP',
              'ENFJ',
              'ENFP',
              'ISTJ',
              'ISFJ',
              'ESTJ',
              'ESFJ',
              'ISTP',
              'ISFP',
              'ESTP',
              'ESFP',
            ].map((type) => (
              <button
                key={type}
                className="mbti-option"
                onClick={() =>
                  onChooseMbti(type)
                }
              >
                {type}
              </button>
            ))}
          </div>

          <button
            className="text-button"
            onClick={onBackHome}
          >
            ← Back
          </button>
        </section>
      </main>
    )
  }

  const currentQuestion =
    questions[questionIndex]

  const isMood = mode === 'mood'

  return (
    <main className="quiz-page">
      <section className="quiz-container">
        <p className="eyebrow">
          {isMood
            ? 'TASTEMATCH / 04'
            : 'TASTEMATCH / 03'}
        </p>

        <p className="quiz-progress">
          {questionIndex + 1} /{' '}
          {questions.length}
        </p>

        <h1>
          {currentQuestion.question}
        </h1>

        <div className="answer-list">
          {currentQuestion.answers.map(
            (answer, index) => (
              <button
                key={index}
                className="answer-option"
                onClick={() =>
                  onChooseAnswer(
                    answer,
                  )
                }
              >
                {answer.text}
              </button>
            ),
          )}
        </div>

        {isMood && (
          <p className="quiz-hint">
            This describes how you feel
            right now.
          </p>
        )}
      </section>
    </main>
  )
}

export default Quiz

