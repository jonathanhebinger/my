import { Stack } from '@mui/material'
import { selectStateById } from '@my/shared/redux'
import { State as _State } from '@my/shared/types'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StateInfo from './StateInfo'
import StateType from './StateType'

export default function State() {
  const { stateUuid } = useParams<{ stateUuid: string }>()

  if (!stateUuid) throw new Error()

  const state = useSelector(selectStateById(stateUuid))

  const methods = useForm<_State>({ defaultValues: state })
  const onSubmit: SubmitHandler<_State> = data => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <StateInfo />
          <StateType />
        </Stack>
      </form>
    </FormProvider>
  )
}
