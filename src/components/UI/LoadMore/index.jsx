import React from 'react'
import style from './LoadMore.module.scss'
import { useDispatch } from 'react-redux';
import { loadMoreCharacters } from 'store/characters/actions';


export default function LoadMore() {
  const dispatch = useDispatch();
  const loadMore = () => {
    dispatch(loadMoreCharacters());
    
};
  return (
    <button className={style.button} onClick={loadMore}>
                LOAD MORE
            </button>
  )
}
