import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/registros/registrosSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    usuario: '',

    modelo: '',

    fecha_hora: '',

    tiempo_registrado: '',

    cumplimiento: false,

    diferencia_tiempo: '',

}

const RegistrosNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/registros/registros-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label="Usuario" labelFor="usuario">
      <Field name="usuario" id="usuario" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField label="Modelo" labelFor="modelo">
      <Field name="modelo" id="modelo" component={SelectField} options={[]} itemRef={'modelos'}></Field>
  </FormField>

  <FormField
      label="FechaHora"
  >
      <Field
          type="datetime-local"
          name="fecha_hora"
          placeholder="FechaHora"
      />
  </FormField>

    <FormField
        label="TiempoRegistrado"
    >
        <Field
            type="number"
            name="tiempo_registrado"
            placeholder="TiempoRegistrado"
        />
    </FormField>

  <FormField label='Cumplimiento' labelFor='cumplimiento'>
      <Field
          name='cumplimiento'
          id='cumplimiento'
          component={SwitchField}
      ></Field>
  </FormField>

    <FormField
        label="DiferenciaTiempo"
    >
        <Field
            type="number"
            name="diferencia_tiempo"
            placeholder="DiferenciaTiempo"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/registros/registros-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

RegistrosNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default RegistrosNew
