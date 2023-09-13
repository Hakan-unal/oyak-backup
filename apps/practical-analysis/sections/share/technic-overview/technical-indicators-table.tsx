import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { IndicatorStatusEnum } from '@libs/api/constants';
import { ColumnDef } from '@libs/components/atomic/table/constants';
import Text from '@libs/components/atomic/text/text';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import {
  infoheaderGroupCell,
  InfoHeaderGroupCellProps,
} from '@libs/components/molecules/table/constants';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import useModal from '@libs/hooks/useModal';
import { FinnetSharedRequestModel } from '@libs/models/finnet';
import { DynamicType } from '@libs/models/model';
import { themeColors } from '@libs/theme/index';
import { getIndicatorStatusByDecision } from '@libs/utils/share.utils';

import { TechnicalIndicatorsHeaderDescriptions } from './constants';
import { getTechnicalIndicatorsChartHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';
import ArrowDown from 'prac-analysis/public/images/svgs/arrow-down.svg';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const TechnicalIndicatorsTable = ({ serviceParams }: Props) => {
  const { t } = useTranslation();
  const { AlertModal, infoAlert } = useModal();

  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.TECHNICAL_INDICATORS,
    () => getTechnicalIndicatorsChartHandler(serviceParams),
  );

  const psarKeywordText = t('general_technicOverview_table_psar_text');

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const showHeaderInfoModal = (cell) => {
    infoAlert({
      title       : TechnicalIndicatorsHeaderDescriptions[cell.displayName].header,
      text        : TechnicalIndicatorsHeaderDescriptions[cell.displayName].text,
      hideButtons : true,
    });
  };

  const showPsarModal = () => {
    infoAlert({
      title       : 'general_technicOverview_popup_psar_subtitle',
      text        : 'general_technicOverview_popup_psar_text',
      hideButtons : true,
    });
  };

  const TechnicalIndicatorCell = (
    leftText?: string,
    rightText?: string,
    decision?: string,
    bottomElement?: ReactElement,
  ) => {
    const status = getIndicatorStatusByDecision(decision);

    return (
      <table className='w-full h-full'>
        <tbody>
          <tr className='h-1/2'>
            {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
            <td className='w-1/2 pl-2.5' colSpan={rightText ? 1 : 2}>
              <Text label={leftText} />
            </td>
            {rightText && (
              <td className='w-1/2 pl-2.5 border-l'>
                <Text label={rightText} />
              </td>
            )}
          </tr>
          <tr className='h-1/2 border-t'>
            <td className='px-2' colSpan={2}>
              {bottomElement ? (
                bottomElement
              ) : (
                <ArrowDown
                  className={`w-full ${
                    status === IndicatorStatusEnum.NEGATIVE
                      ? 'rotate-0'
                      : 'rotate-180'
                  }`}
                  fill={
                    status === IndicatorStatusEnum.NEGATIVE
                      ? themeColors.primary.dark
                      : themeColors.green.dark
                  }
                  height='20px'
                  width='12px'
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const TechnicalIndicatorHeader = (
    leftHeader: InfoHeaderGroupCellProps,
    rightHeader: InfoHeaderGroupCellProps,
  ) => (
    <div className='h-full w-full grid grid-cols-2 items-center'>
      <div>{infoheaderGroupCell(leftHeader)}</div>
      <div className='h-full flex items-center pl-3 border-l border-basic-three'>
        {infoheaderGroupCell(rightHeader)}
      </div>
    </div>
  );

  const TechnicalIndicatorsColumnDefs: ColumnDef[] = [
    {
      headerName : 'general_technicOverview_table_rsi_text',
      children   : [
        {
          minWidth     : 150,
          cellRenderer : (cell) =>
            TechnicalIndicatorCell(
              cell.data.RSI,
              cell.data.RSIOrtalama,
              cell.data.RSISinyal,
            ),
        },
      ],
      headerGroupComponent: (cell: DynamicType) =>
        infoheaderGroupCell({
          cell,
          showInfoIcon : true,
          onClick      : showHeaderInfoModal,
        }),
    },
    {
      headerName : 'general_technicOverview_table_mom_text',
      children   : [
        {
          minWidth     : 150,
          cellRenderer : (cell) =>
            TechnicalIndicatorCell(
              cell.data.MOM,
              cell.data.MOMOrtalama,
              cell.data.MOMSinyal,
            ),
        },
      ],
      headerGroupComponent: (cell: DynamicType) =>
        infoheaderGroupCell({
          cell,
          showInfoIcon : true,
          onClick      : showHeaderInfoModal,
        }),
    },
    {
      headerName : 'general_technicOverview_table_macd_text',
      children   : [
        {
          minWidth     : 150,
          cellRenderer : (cell) =>
            TechnicalIndicatorCell(
              cell.data.MACD,
              cell.data._MACDSinyalSerisi,
              cell.data.MACDSinyal,
            ),
        },
      ],
      headerGroupComponent: (cell: DynamicType) =>
        infoheaderGroupCell({
          cell,
          showInfoIcon : true,
          onClick      : showHeaderInfoModal,
        }),
    },
    {
      headerName : 'general_technicOverview_table_stoch_text',
      children   : [
        {
          minWidth     : 150,
          cellRenderer : (cell) =>
            TechnicalIndicatorCell(
              cell.data.StochacticsK,
              cell.data.StochacticsD,
              cell.data.STOCSinyal,
            ),
        },
      ],
      headerGroupComponent: (cell: DynamicType) =>
        infoheaderGroupCell({
          cell,
          showInfoIcon : true,
          onClick      : showHeaderInfoModal,
        }),
    },
    {
      headerName : 'general_technicOverview_table_diPlus_text',
      children   : [
        {
          minWidth     : 175,
          cellRenderer : (cell) =>
            TechnicalIndicatorCell(
              cell.data.DI,
              cell.data.DI1,
              cell.data.DISinyal,
            ),
        },
      ],
      headerGroupComponent: (cell: DynamicType) =>
        TechnicalIndicatorHeader(
          {
            cell,
            showInfoIcon : true,
            onClick      : showHeaderInfoModal,
          },
          {
            displayName: 'general_technicOverview_table_diMinus_text',
          },
        ),
    },
    {
      headerName : 'general_technicOverview_table_dxy_text',
      children   : [
        {
          minWidth     : 175,
          cellRenderer : (cell) =>
            TechnicalIndicatorCell(
              cell.data._DX,
              cell.data.DXYSinyal,
              undefined,
              <Text
                className='w-full flex justify-center items-center'
                label={cell.data._ParabolicSar}
              />,
            ),
        },
      ],
      headerGroupComponent: (cell: DynamicType) =>
        TechnicalIndicatorHeader(
          {
            cell,
          },
          {
            displayName: 'general_technicOverview_table_dxySignal_text',
          },
        ),
    },
    {
      headerName : 'general_technicOverview_table_lastClosure_text',
      children   : [
        {
          minWidth     : 225,
          cellRenderer : (cell) =>
            TechnicalIndicatorCell(
              cell.data._Kapanis,
              undefined,
              undefined,
              <TranslatedText
                className='w-full flex justify-center items-center'
                components={[
                  <a
                    className='text-primary-dark mx-1 cursor-pointer'
                    key='0'
                    onClick={showPsarModal}
                  />,
                ]}
                label={cell.data.KapanisPsar?.replace(
                  psarKeywordText,
                  `<0>${psarKeywordText}</0>`,
                )}
              />,
            ),
        },
      ],
      headerGroupComponent: (cell: DynamicType) =>
        infoheaderGroupCell({
          cell,
        }),
    },
  ];

  return (
    <div className='flex flex-col gap-4' id='technicalIndicators'>
      <TranslatedText
        label='general_technicOverview_table_technicalİndicators_title'
        textVariant='body1'
      />
      <ColumnTypeTable
        sizeColumnsToFit
        className='w-full'
        columnDefs={TechnicalIndicatorsColumnDefs}
        defaultColDef={{ sortable: false }}
        isLoading={isFetching}
        rowData={data?.JSVeriler?.map((row) => row?.s) || []}
      />
      <AlertModal />
    </div>
  );
};

export default TechnicalIndicatorsTable;
