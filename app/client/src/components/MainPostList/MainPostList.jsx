import data from '../../data/data'
import MainPostItem from '../MainPostItem/MainPostItem'
import { useState } from 'react'

const MainPostList = () => {
  // SET THIS BY FETCHI API's ALL POSTS
  // WITH USE EFFECT
  // ON APP/ROOT

  const [dummyData, setDummyData] = useState(data)

  return (
    <main className="flex flex-col space-y-4 mx-auto px-2 max-w-screen-lg">
      {dummyData.map((obj, index) => {
        return (
          <MainPostItem
            obj={obj}
            key={`POST_${index}`}
            setDummyData={setDummyData}
            dummyData={dummyData}
          />
        )
      })}
    </main>
  )
}
export default MainPostList
