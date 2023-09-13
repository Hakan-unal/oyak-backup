import { useTranslation } from 'react-i18next';

import TableHeader from '@libs/components/atomic/table/header';

const CustomTableHeader = (params) => {
  const { t } = useTranslation();

  return (
    <TableHeader
      headerName={t(params?.column?.colDef?.headerName)}
      {...params}
    />
  );
};

export default CustomTableHeader;
