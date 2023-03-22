import { useDateContext } from '../contexts'

export default function useDate() {
  return useDateContext().date
}
