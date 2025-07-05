import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/registros/registrosSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const RegistrosView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { registros } = useAppSelector((state) => state.registros)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View registros')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View registros')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/registros/registros-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Usuario</p>

                        <p>{registros?.usuario?.firstName ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Modelo</p>

                        <p>{registros?.modelo?.nombre ?? 'No data'}</p>

                </div>

                <FormField label='FechaHora'>
                    {registros.fecha_hora ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={registros.fecha_hora ?
                        new Date(
                          dayjs(registros.fecha_hora).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No FechaHora</p>}
                </FormField>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>TiempoRegistrado</p>
                  <p>{registros?.tiempo_registrado || 'No data'}</p>
                </div>

                <FormField label='Cumplimiento'>
                    <SwitchField
                      field={{name: 'cumplimiento', value: registros?.cumplimiento}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>DiferenciaTiempo</p>
                  <p>{registros?.diferencia_tiempo || 'No data'}</p>
                </div>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/registros/registros-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

RegistrosView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default RegistrosView;
