import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { prevPath } from '../lib/navStack'

/**
 * 智能返回：历史栈中上一页正是父页面时直接 pop（保留其状态与滚动位置），
 * 否则跳转到固定父级。既有「返回」的直觉语义，又保证去向确定、不会循环。
 */
export function useSmartBack(parent: string) {
  const navigate = useNavigate()
  return useCallback(() => {
    if (prevPath() === parent) navigate(-1)
    else navigate(parent)
  }, [navigate, parent])
}
