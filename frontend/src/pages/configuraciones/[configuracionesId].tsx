import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/configuraciones/configuracionesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditConfiguraciones = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    tiempo_objetivo: '',

    tiempo_luz_amarilla: '',

    tiempo_luz_roja: '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { configuraciones } = useAppSelector((state) => state.configuraciones)

  const { configuracionesId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: configuracionesId }))
  }, [configuracionesId])

  useEffect(() => {
    if (typeof configuraciones === 'object') {
      setInitialValues(configuraciones)
    }
  }, [configuraciones])

  useEffect(() => {
      if (typeof configuraciones === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (configuraciones)[el])

          setInitialValues(newInitialVal);
      }
  }, [configuraciones])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: configuracionesId, data }))
    await router.push('/configuraciones/configuraciones-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit configuraciones')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit configuraciones'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="TiempoObjetivo"
    >
        <Field
            type="number"
            name="tiempo_objetivo"
            placeholder="TiempoObjetivo"
        />
    </FormField>

    <FormField
        label="TiempoLuzAmarilla"
    >
        <Field
            type="number"
            name="tiempo_luz_amarilla"
            placeholder="TiempoLuzAmarilla"
        />
    </FormField>

    <FormField
        label="TiempoLuzRoja"
    >
        <Field
            type="number"
            name="tiempo_luz_roja"
            placeholder="TiempoLuzRoja"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/configuraciones/configuraciones-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditConfiguraciones.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditConfiguraciones
