import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  HStack,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { NextPageWithLayout } from './_app';
import { ResponseModel } from '@hooks/queries/response.model';
import useStatus from '@hooks/useStatus';
import { getLocalizationText, InternalApi, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import paths from '@routes/paths';

import { Endpoints } from '@common/endpoints';
import { DynamicType } from '@models/common.model';

import TranslatedText from '@components/core/Text';
import Error from '@components/icon/Error';
import Success from '@components/icon/Success';
import UploadFileIcon from '@components/icon/UploadFileIcon';
import MainLayout from '@components/layout/MainLayout';
import PdfModal from '@components/modals/PDFModal';

interface Contract {
  customerExtId?: number;
  contractId?: number;
  contractName?: string;
  contractType?: string;
  contractDate?: DynamicType;
  contractTypeId?: number;
  candidateContractId?: number;
}

const StatusLabel = ({ isApproved = false, isWebScreen = false }) => {
  const color = isApproved ? 'helper.green.base' : 'basic.300';

  const label = isApproved
    ? 'contractInformations_contracts_signed_text'
    : 'contractInformations_contracts_notSigned_text';

  return (
    <HStack color={color}>
      <Icon
        as={isApproved ? Success : Error}
        boxSize={isWebScreen ? 6 : 4}
        fill={color}
      />
      <TranslatedText color={color} label={label} variant='body4' />
    </HStack>
  );
};

const Contracts: NextPageWithLayout<{
  contracts: Contract[];
}> = ({ contracts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ buffer, setBuffer ] = useState<undefined | DynamicType>(undefined);
  const [ isButtonLoading, setIsButtonLoading ] = useState(false);
  const [ isApproved, setIsApproved ] = useState<boolean>(false);
  const minHeight = useBreakpointValue({ base: '58vh', '2xl': '64vh' });
  const isWebScreen = useBreakpointValue({ base: false, md: true });
  const { current } = useStatus();

  const [ selectedContract, setSelectedContract ] = useState<
    undefined | Contract
  >(undefined);

  const router = useRouter();

  const { data: contractData, mutate } = useMutation((params: DynamicType) =>
    InternalApi.get(Endpoints.Contract.ApproveOtherContracts, {
      params,
    }).then((r) => r.data.response),
  );

  useEffect(() => {
    if (contractData) {
      setBuffer(contractData.contract);

      setSelectedContract((prev) => ({
        ...prev,
        contractId: contractData?.contractId,
      }));

      onOpen();
    }
  }, [ contractData ]);

  const openContract = (contract: Contract) => {
    setSelectedContract(contract);
    mutate({
      contractTypeId: contract.contractTypeId,
    });
    setIsApproved(contract.contractId !== 0);
  };

  const onApprove = () => {
    setIsButtonLoading(true);
    InternalApi.post(Endpoints.Contract.ApproveOtherContracts, {
      customerExtId : selectedContract?.customerExtId,
      contractId    : selectedContract?.contractId,
      isApproved    : true,
    })
      .then(() => {
        onClose();
        router.reload();
        setIsButtonLoading(false);
      })
      .catch(() => setIsButtonLoading(false));
  };

  const currentStatu = Number(current);

  if (!isNaN(currentStatu) && currentStatu <= 2 && currentStatu !== 0) {
    return (
      <Alert status='warning'>
        <AlertIcon />
        <TranslatedText
          color='basic.500'
          label='contractInformations_contracts_shouldStepCompleted_text'
          variant='body3'
        />
      </Alert>
    );
  }

  return isWebScreen ? (
    <VStack align={'start'} bg='white' minH={240} p='8' rounded='2xl' w='full'>
      <TranslatedText
        color='primary.base'
        fontSize='24px'
        fontWeight='bold'
        label='contractInformations_contracts_contracts_title'
        mb={8}
      />
      <Box h={minHeight} overflowY='auto' w={'full'}>
        <TableContainer overflowX='unset' overflowY='unset'>
          <Table colorScheme='blackAlpha' variant='striped'>
            <Thead
              bgColor='#F4F4F4'
              boxShadow='2xl'
              position='sticky'
              shadow='lg'
              top={0}
              zIndex='docked'
            >
              <Tr>
                <Th />
                <Th>
                  <TranslatedText
                    color='basic.500'
                    label='contractInformations_contracts_contractName_subtitle'
                    variant='body3'
                  />
                </Th>
                <Th>
                  <TranslatedText
                    color='basic.500'
                    label='contractInformations_contracts_status_subtitle'
                    variant='body3'
                  />
                </Th>
                <Th>
                  <TranslatedText
                    color='basic.500'
                    label='contractInformations_contracts_date_subtitle'
                    variant='body3'
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {contracts?.map((contract) => (
                <Tr key={contract.contractTypeId}>
                  <Td>
                    <UploadFileIcon
                      boxSize={6}
                      cursor='pointer'
                      onClick={() => openContract(contract)}
                    />
                  </Td>
                  <Td cursor='pointer' onClick={() => openContract(contract)}>
                    <TranslatedText
                      color='basic.400'
                      label={contract?.contractName || ''}
                      variant='body4'
                    />
                  </Td>
                  <Td>
                    <StatusLabel
                      isApproved={contract.contractId !== 0}
                      isWebScreen={isWebScreen}
                    />
                  </Td>

                  <Td>
                    <TranslatedText
                      color='basic.400'
                      label={
                        contract.contractDate
                          ? new Date(contract.contractDate).toLocaleDateString(
                            'tr',
                          )
                          : ''
                      }
                      variant='body4'
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {buffer?.buffer && (
        <PdfModal
          addBase64Header // If file is of Base64 type but no Header is attached use this. check base64SimplePdfFile.ts
          isApproved={isApproved}
          isButtonLoading={isButtonLoading}
          isOpen={isOpen}
          onApprove={onApprove}
          onClose={onClose}
          onLoadError={onClose}
          pdfFile={buffer?.buffer}
          title=''
        />
      )}
    </VStack>
  ) : (
    <VStack
      align={'start'}
      bg='white'
      minH={240}
      px='4'
      py='6'
      rounded='2xl'
      w='full'
    >
      <Box h={minHeight} overflowY='auto' w='full'>
        <TableContainer overflowX='unset' overflowY='unset'>
          <Table colorScheme='basic' size='sm' variant='striped'>
            <Thead
              bgColor='basic.100'
              boxShadow='lg'
              h='48px'
              position='sticky'
              top={0}
              zIndex='docked'
            >
              <Tr>
                <Th pl={5}>
                  <TranslatedText
                    label='contractInformations_contracts_contractNameDate_subtitle'
                    variant='body3'
                  />
                </Th>
                <Th>
                  <TranslatedText
                    label='contractInformations_contracts_status_subtitle'
                    variant='body3'
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {contracts?.map((contract) => (
                <Tr key={contract.contractTypeId}>
                  <Td onClick={() => openContract(contract)}>
                    <Flex
                      gap={3}
                      w={{ base: '120px', xs: '190px', sm: 'full' }}
                    >
                      <UploadFileIcon
                        boxSize={6}
                        cursor='pointer'
                        fill='basic.300'
                        mt={6}
                        onClick={() => openContract(contract)}
                      />
                      <Flex direction='column' gap={2} w='100%'>
                        <TranslatedText
                          color='basic.500'
                          label={contract?.contractName || ''}
                          mt={6}
                          overflow='hidden'
                          textOverflow='ellipsis'
                          variant='body4'
                        />
                        <TranslatedText
                          color='basic.400'
                          label={
                            contract.contractDate
                              ? new Date(
                                contract.contractDate,
                              ).toLocaleDateString('tr')
                              : ''
                          }
                          variant='body4'
                        />
                      </Flex>
                    </Flex>
                  </Td>
                  <Td px={0}>
                    <StatusLabel
                      isApproved={contract.contractId !== 0}
                      isWebScreen={isWebScreen}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <PdfModal
        addBase64Header // If file is of Base64 type but no Header is attached use this. check base64SimplePdfFile.ts
        isApproved={isApproved}
        isButtonLoading={isButtonLoading}
        isOpen={isOpen}
        onApprove={onApprove}
        onClose={onClose}
        onLoadError={onClose}
        pdfFile={buffer?.buffer || ''}
        title=''
      />
    </VStack>
  );
};

Contracts.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const { user, token } = req.session;

  if (!user?.isLoggedIn) {
    return {
      redirect: {
        destination : paths.LOGIN,
        statusCode  : 302,
      },
    };
  }

  const getContracts = async () => {
    const contracts = await RemoteApi(token?.accessToken, false)
      .get<ResponseModel<Contract[]>>(
        `/api/Contract/List?customerExtId=${user?.customerExtId}`,
      )
      .then((r) => r?.data?.response);

    return contracts || [];
  };

  return {
    props: {
      contracts : await getContracts(),
      messages  : await getLocalizationText(),
    },
  };
}, sessionOptions);
export default Contracts;
