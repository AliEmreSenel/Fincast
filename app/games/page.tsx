"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Line, ResponsiveLine } from '@nivo/line'

let questions = [
  {
    type: 0,
    question: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    questionGraph: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 5 },
      { x: 5, y: 3 },
      { x: 6, y: 4 },
    ],
    answers: [
      {
        type: 0, // Graph
        correct: false,
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 5 },
          { x: 5, y: 3 },
          { x: 6, y: 4 },
          { x: 7, y: 0 },
        ]
      },
      {
        type: 0, // Graph
        correct: false,
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 5 },
          { x: 5, y: 3 },
          { x: 6, y: 4 },
          { x: 7, y: 3 },
        ]
      },
      {
        type: 0, // Graph
        correct: true,
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 5 },
          { x: 5, y: 3 },
          { x: 6, y: 4 },
          { x: 7, y: 5 },
        ]
      },
      {
        type: 0, // Graph
        correct: false,
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 5 },
          { x: 5, y: 3 },
          { x: 6, y: 4 },
          { x: 7, y: 10 },
        ]
      },
    ],
    solution: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    type: 1,
    question: "Wow hard wuestion",
    answers: [
      {
        type: 1,
        correct: true,
        data: "Hard"
      },
      {
        type: 1,
        correct: false,
        data: "EZ"
      },
      {
        type: 1,
        correct: false,
        data: "No"
      },
      {
        type: 1,
        correct: false,
        data: "Oof"
      }
    ],
    solution: "Hard question"
  },
  {
    type: 1,
    question: "Wow hard wuestion",
    answers: [
      {
        type: 1,
        correct: false,
        data: "Hard"
      },
      {
        type: 1,
        correct: true,
        data: "EZ"
      },
      {
        type: 1,
        correct: false,
        data: "No"
      },
      {
        type: 1,
        correct: false,
        data: "Oof"
      }
    ],
    solution: "EZ question"
  }
]

export default function Component() {
  let [questionIndex, setQuestionIndex] = useState(0);
  let question = questions[questionIndex];
  let [selectedAnswer, setSelectedAnswer] = useState(-1);
  let [score, setScore] = useState(0);
  let [showSolution, setShowSolution] = useState(false);
  return (
    <div className="h-full w-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Daily Quiz</h1>
        </div>
        <Progress className="mb-8" value={(questionIndex + (selectedAnswer !== -1 ? 1 : 0)) / questions.length * 100} />
        <div className="mb-8">
          {question.type === 0 ? (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{question.question}</h2>
              <div className="w-full aspect-[16/9]" >
                <ResponsiveLine data={[
                  {
                    id: "ASD",
                    data: question.questionGraph!
                  }
                ]}
                  margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                  xScale={{
                    type: "point",
                  }}
                  yScale={{
                    type: "linear",
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                  }}
                  axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16,
                  }}
                  colors={["#00ff00"]}
                  pointSize={6}
                  useMesh={true}
                  gridYValues={6}
                  theme={{
                    tooltip: {
                      chip: {
                        borderRadius: "9999px",
                      },
                      container: {
                        fontSize: "12px",
                        textTransform: "capitalize",
                        borderRadius: "6px",
                      },
                    },
                    grid: {
                      line: {
                        stroke: "#f3f4f6",
                      },
                    },
                  }}
                  role="application"
                />
              </div>
            </div>
          ) : (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{question.question}</h2>
          )}
          <div className={"mt-4" + (question.type == 0 ? " grid grid-cols-2" : "")}>
            {question.answers.map((answer, index) => (
              <button
                key={index}
                className={`w-full py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-800 text-left mt-2 ${selectedAnswer === index
                  ? answer.correct
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : selectedAnswer !== -1 ?
                    answer.correct ?
                      "bg-green-500 text-white"
                      : "bg-white"
                    : "bg-white"
                  }`}
                onClick={() => {
                  if (selectedAnswer === -1) {
                    setSelectedAnswer(index);
                    if (answer.correct) {
                      setScore(score + 1);
                    }
                  }
                }}
              >
                {answer.type == 0 ?
                  (
                    <div className="w-full aspect-[16/9]" >
                      <ResponsiveLine data={[
                        {
                          id: "ASD",
                          // @ts-ignore
                          data: answer.data
                        }
                      ]}
                        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                        xScale={{
                          type: "point",
                        }}
                        yScale={{
                          type: "linear",
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                          tickSize: 0,
                          tickPadding: 16,
                        }}
                        axisLeft={{
                          tickSize: 0,
                          tickValues: 5,
                          tickPadding: 16,
                        }}
                        colors={["#00ff00"]}
                        pointSize={6}
                        useMesh={true}
                        gridYValues={6}
                        theme={{
                          tooltip: {
                            chip: {
                              borderRadius: "9999px",
                            },
                            container: {
                              fontSize: "12px",
                              textTransform: "capitalize",
                              borderRadius: "6px",
                            },
                          },
                          grid: {
                            line: {
                              stroke: "#f3f4f6",
                            },
                          },
                        }}
                        role="application"
                      />
                    </div>
                  ) :
                  (
                    <>{answer.data}</>
                  )

                }
              </button>
            ))}
          </div>
          {selectedAnswer !== -1 && <>
            <div className='mt-5'>
              <h4 className="font-semibold text-lg">
                Solution:
              </h4>
              {question.solution}
            </div>
            <div className='flex justify-center'>
              <Button className="mt-4 bg-blue-500 self-end"
                onClick={() => {
                  if (selectedAnswer !== -1) {
                    if (questionIndex + 1 < questions.length) {
                      setQuestionIndex(questionIndex + 1);
                      setSelectedAnswer(-1);
                      setShowSolution(false);
                    }
                    else {

                    }
                  }
                }}>
                {(selectedAnswer !== -1 && questionIndex + 1 == questions.length) ? "Finish" :
                  "Next Question"}
              </Button>

            </div>
          </>
          }
        </div>
      </div>
    </div>
  )
}
