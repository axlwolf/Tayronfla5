import React from 'react';
import CardBox from '../CardBox';
import dataFormatter from '../../helpers/dataFormatter';
import ListActionsPopover from "../ListActionsPopover";
import {useAppSelector} from "../../stores/hooks";
import {Pagination} from "../Pagination";
import LoadingSpinner from "../LoadingSpinner";
import Link from 'next/link';

type Props = {
    registros: any[];
    loading: boolean;
    onDelete: (id: string) => void;
    currentPage: number;
    numPages: number;
    onPageChange: (page: number) => void;
};

const ListRegistros = ({ registros, loading, onDelete, currentPage, numPages, onPageChange }: Props) => {
    const corners = useAppSelector((state) => state.style.corners);
    const bgColor = useAppSelector((state) => state.style.cardsColor);

    return (
        <>
            <div className='relative overflow-x-auto p-4 space-y-4'>
                {loading && <LoadingSpinner />}
                {!loading && registros.map((item) => (
                  <div key={item.id}>
                    <CardBox hasTable isList className={'rounded shadow-none'}>
                        <div className={`flex rounded dark:bg-dark-900 border items-center overflow-hidden`}>
                          <Link
                              href={`/registros/registros-view/?id=${item.id}`}
                              className={
                                  'flex-1 px-4 py-6 h-24 flex divide-x-2 divide-stone-300 items-center overflow-hidden dark:divide-dark-700 overflow-x-auto'
                              }
                          >

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Usuario</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.usersOneListFormatter(item.usuario) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Modelo</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.modelosOneListFormatter(item.modelo) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>FechaHora</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.dateTimeFormatter(item.fecha_hora) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>TiempoRegistrado</p>
                                <p className={'line-clamp-2'}>{ item.tiempo_registrado }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Cumplimiento</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.booleanFormatter(item.cumplimiento) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>DiferenciaTiempo</p>
                                <p className={'line-clamp-2'}>{ item.diferencia_tiempo }</p>
                            </div>

                          </Link>
                            <ListActionsPopover
                              onDelete={onDelete}
                              itemId={item.id}
                              pathEdit={`/registros/registros-edit/?id=${item.id}`}
                              pathView={`/registros/registros-view/?id=${item.id}`}
                              hasUpdatePermission={true}
                            />
                        </div>
                    </CardBox>
                  </div>
                ))}
                {!loading && registros.length === 0 && (
                  <div className='col-span-full flex items-center justify-center h-40'>
                      <p className=''>No data to display</p>
                  </div>
                )}
            </div>
            <div className={'flex items-center justify-center my-6'}>
                <Pagination
                  currentPage={currentPage}
                  numPages={numPages}
                  setCurrentPage={onPageChange}
                />
            </div>
        </>
    )
};

export default ListRegistros
