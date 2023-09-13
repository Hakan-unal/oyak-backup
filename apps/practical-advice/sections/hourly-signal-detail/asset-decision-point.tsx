import { HourlyEquityDecisionStatusModel } from '@libs/api/oyak/api';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import InfoText from '@libs/components/molecules/text/info-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import useModal from '@libs/hooks/useModal';

import { AssetDecisionPointColumnDefs } from './constants';

interface HourlySignalAssetDecisionPointProps {
  symbol: string;
  list?: HourlyEquityDecisionStatusModel[] | null;
}

const HourlySignalAssetDecisionPoint = ({
  symbol,
  list,
}: HourlySignalAssetDecisionPointProps) => {
  const { AlertModal, infoAlert } = useModal();

  const showInfoMessage = () => {
    infoAlert({
      text           : 'hourlySigns_popup_extendedInfo_text',
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  return (
    <>
      <div className='flex flex-col'>
        <TranslatedText
          className='text-sm sm:text-base mb-8'
          components={[ <strong key='0' /> ]}
          label='hourlySigns_assetDecisionPoint_tab_assetDecisionPoint_text'
          textColor='text-basic-six'
          values={{ symbol }}
        />

        <div className='min-h-[500px] flex flex-col justify-between'>
          <ColumnTypeTable
            sizeColumnsToFit
            className='w-full'
            columnDefs={AssetDecisionPointColumnDefs}
            defaultColDef={{ sortable: false }}
            rowData={list || []}
          />

          <InfoText
            className='text-xs sm:text-sm cursor-pointer'
            components={[
              <a
                className='font-bold text-primary-dark cursor-pointer'
                key='hourlySigns_info_text'
                onClick={showInfoMessage}
              />,
            ]}
            label='hourlySigns_info_text'
          />
        </div>
      </div>

      <AlertModal />
    </>
  );
};

export default HourlySignalAssetDecisionPoint;
