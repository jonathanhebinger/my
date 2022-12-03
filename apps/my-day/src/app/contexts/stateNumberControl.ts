import constate from 'constate'
import { useMemo } from 'react'
import { v4 } from 'uuid'
import { Icon, StateNumberControl } from '@my/shared/types'
import { useStateNumberContext } from './stateNumber'

export const [StateNumberControlProvider, useStateNumberControlContext] =
  constate(({ uuid }: { uuid: string }) => {
    const {
      type: { controls, min },
      upsertControl,
      removeControl,
    } = useStateNumberContext()

    return useMemo(() => {
      const DEFAULT: StateNumberControl = {
        uuid: v4(),
        name: '',
        position: min,
        icon: '',
        color: 'inherit',
      }
      const control = controls.find(control => control.uuid === uuid) || DEFAULT

      const set = (update: Partial<StateNumberControl>) =>
        upsertControl({ ...control, ...update })
      const setName = (name: string) => set({ name })
      const setPosition = (position: number) => set({ position })
      const setIcon = (icon: Icon) => set({ icon })

      const remove = () => removeControl(control)

      return { control, setName, setPosition, setIcon, remove }
    }, [controls, min, upsertControl, removeControl, uuid])
  })
