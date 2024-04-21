"use client"
import { IoSchool } from 'react-icons/io5'
import { Article1, Article1Graph } from './article1'
import { Article2, Article2Graph } from './article2'
import { Article3, Article3Graph } from './article3'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Component() {
  let [topicId, setTopicId] = useState(-1);
  let percentage = 33;
  return (
    <div className="p-4">
      <div className="grid gap-4">
        <div className="mb-4 flex pb-4 border-b">
          <div className='flex flex-grow flex-row'>
            <IoSchool className="h-16 w-16 me-2 inlince-block" />
            <h1 className="self-center text-3xl font-bold text-gray-900 dark:text-gray-100 inline-block">Education</h1>
          </div>
          <div className='me-0 h-16 w-16'>
            <CircularProgressbar value={percentage} text={`${percentage}%`} className='h-16 w-16' strokeWidth={14} />
          </div>
        </div>
        {topicId == -1 ?
          <div>
            <Card className='mt-4'>
              <CardContent>
                <div className='pt-4'>
                  <div className="flex grow-1 justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold me-4">Rounding Bottom</h2>
                    </div>
                    <div className="self-center">MSFT</div>
                  </div>
                  <Article2Graph />
                </div>
              </CardContent>
              <CardFooter>
                <Button className='flex flex-grow bg-blue-500 hover:bg-blue-600' onClick={() => setTopicId(2)}>
                  Explore Topic
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardContent>
                <div className='pt-4'>
                  <div className="flex grow-1 justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold me-4">Head and Shoulders</h2>
                    </div>
                    <div className="self-center">AVB</div>
                  </div>
                  <Article1Graph />
                </div>
              </CardContent>
              <CardFooter>
                <Button className='flex flex-grow bg-blue-500 hover:bg-blue-600' onClick={() => setTopicId(1)}>
                  Explore Topic
                </Button>
              </CardFooter>
            </Card>
            <Card className='mt-4'>
              <CardContent>
                <div className='pt-4'>
                  <div className="flex grow-1 justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold me-4">Positive News</h2>
                    </div>
                    <div className="self-center">MRNA</div>
                  </div>
                  <Article3Graph />
                </div>
              </CardContent>
              <CardFooter>
                <Button className='flex flex-grow bg-blue-500 hover:bg-blue-600' onClick={() => setTopicId(3)}>
                  Explore Topic
                </Button>
              </CardFooter>
            </Card>
          </div> : topicId == 1 ? <Article1 /> : topicId == 2 ? <Article2 /> : topicId == 3 ? <Article3 /> : ""}
        {topicId !== -1 && <Button className='flex flex-grow bg-blue-500 hover:bg-blue-600' onClick={() => setTopicId(-1)}> Close </Button>}
      </div>
    </div>
  )
}
