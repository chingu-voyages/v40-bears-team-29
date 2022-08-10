import classes from './MainPostList.module.css'
import data from '../../data/data'
import MainPostItem from '../MainPostItem/MainPostItem'
import { useState } from 'react'

const MainPostList = () => {
  // SET THIS BY FETCHI API's ALL POSTS
  // WITH USE EFFECT
  // ON APP/ROOT

  const [dummyData, setDummyData] = useState(data)

  return (
    <ul className={classes.ul}>
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
    </ul>
  )
}
export default MainPostList
