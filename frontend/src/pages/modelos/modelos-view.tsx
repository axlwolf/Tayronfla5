import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/modelos/modelosSlice'
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

const ModelosView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { modelos } = useAppSelector((state) => state.modelos)

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
              <title>{getPageTitle('View modelos')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View modelos')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/modelos/modelos-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Nombre</p>
                    <p>{modelos?.nombre}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Registros Modelo</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>FechaHora</th>

                                <th>TiempoRegistrado</th>

                                <th>Cumplimiento</th>

                                <th>DiferenciaTiempo</th>

                            </tr>
                            </thead>
                            <tbody>
                            {modelos.registros_modelo && Array.isArray(modelos.registros_modelo) &&
                              modelos.registros_modelo.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/registros/registros-view/?id=${item.id}`)}>

                                    <td data-label="fecha_hora">
                                        { dataFormatter.dateTimeFormatter(item.fecha_hora) }
                                    </td>

                                    <td data-label="tiempo_registrado">
                                        { item.tiempo_registrado }
                                    </td>

                                    <td data-label="cumplimiento">
                                        { dataFormatter.booleanFormatter(item.cumplimiento) }
                                    </td>

                                    <td data-label="diferencia_tiempo">
                                        { item.diferencia_tiempo }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!modelos?.registros_modelo?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/modelos/modelos-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

ModelosView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default ModelosView;
