import { useDataContext } from '../contexts/data'

export default function useDataList() {
  return useDataContext().list
}
