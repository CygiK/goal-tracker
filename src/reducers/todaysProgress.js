import { PROGRESS } from '../action-creators'

export default function todaysProgress (state = {}, action) {
  switch (action.type) {
    case PROGRESS:
      const { goalId, increment } = action.payload
      const previous = state[goalId] || 0
      const offset = Number(increment) || 0
      return // ???

    default:
      return state
  }
}
