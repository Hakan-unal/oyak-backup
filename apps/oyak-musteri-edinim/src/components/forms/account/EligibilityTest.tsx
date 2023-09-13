import { Flex, useMediaQuery } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import React, { useState } from 'react';

import {
  ComplianceTest,
  useComplianceTestQueries,
} from '@hooks/queries/useComplianceTestQueries';
import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';
import { DynamicType } from '@models/common.model';

import TranslatedText from '@components/core/Text';
import EligibilityTestPersonalInfoForm from '@components/forms/account/EligibilityTestPersonalInfoForm';
import EligibilityTestScoreForm from '@components/forms/account/EligibilityTestScoreForm';
import InvestmentInfoForm from '@components/forms/account/InvestmentInfoForm';
import {
  StepperProps,
  StepperPropsWithoutDefaultValues,
} from '@components/forms/stepper.model';
import InfoIcon from '@components/icon/Info';

export interface EligibilityTestStepper extends StepperProps {
  questions: ComplianceTest[];
}

export type ComplianceTestResultModel = {
  score: number;
  riskLevel1: boolean;
  riskLevel2: boolean;
  riskLevel3: boolean;
  riskLevel4: boolean;
  riskLevel5: boolean;
};

const EligibilityTest: React.FC<StepperPropsWithoutDefaultValues> = ({
  initialData,
  onSubmit,
  goBack,
}) => {
  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: initialData ? 2 : 0,
  });

  const { mutate: testMutate, isLoading: isTestMutateLoading } = useMutation({
    mutationFn: (data: DynamicType) =>
      InternalApi.post(Endpoints.Test.ComplianceTest, data),
    onSuccess: (result) => {
      setEligibilityResults(result.data.response);
      nextStep();
    },
  });

  const { mutate: accountMutate, isLoading: isAccountMutateLoading } =
    useMutation({
      mutationFn: (data: DynamicType) =>
        InternalApi.post(
          Endpoints.Account.ComplianceTest,
          data.requestBody,
        ).then((r) => {
          const scoreResult = eligibilityResults;

          setEligibilityResults(r.data.response);
          onSubmit({ formData: data.storeData, scoreResult });

          return r;
        }),
    });

  const { data: questions } = useComplianceTestQueries();
  const [ isAboveMd ] = useMediaQuery('(min-width: 48em)');

  const [ eligibilityStoreStepData, setEligibilityStoreStepData ] = useState(
    initialData?.formData || {},
  );

  const [ eligibilityResults, setEligibilityResults ] = useState<
    ComplianceTestResultModel | undefined
  >(initialData?.scoreResult);

  const steps = [
    {
      label:
        'accountOpeningSteps_suitabilityTest_modal_personalInformations_text',
      form: (
        <EligibilityTestPersonalInfoForm
          defaultValues={eligibilityStoreStepData}
          goBack={goBack}
          onSubmit={(result) => {
            setEligibilityStoreStepData((prev) => ({ ...prev, ...result }));

            nextStep();
          }}
          questions={questions || []}
        />
      ),
    },
    {
      label:
        'accountOpeningSteps_suitabilityTest_modal_investmentInformations_text',
      form: (
        <InvestmentInfoForm
          defaultValues={eligibilityStoreStepData}
          goBack={prevStep}
          isSubmitLoading={isTestMutateLoading}
          onSubmit={(result) => {
            setEligibilityStoreStepData((prev) => ({ ...prev, ...result }));

            const finalEligibilityTestData = {
              questionPrep: {
                hasTaxResidence:
                  eligibilityStoreStepData.hasTaxResidence === 'true',
                country      : eligibilityStoreStepData.country,
                hasTaxNumber : !!eligibilityStoreStepData.hasTaxNumber,
                taxNumber    : eligibilityStoreStepData.taxNumber,
                reasonForNotHaveTaxNumber:
                  eligibilityStoreStepData.reasonForNotHaveTaxNumber,
              },
              question1 : +eligibilityStoreStepData.question1,
              question2 : +eligibilityStoreStepData.question2,
              question4 : +result.question4.substring(2),
              question5 : +result.question5.substring(2),
              question6 : {
                question6_1A : result.question6_1A.substring(2),
                question6_1B : result.question6_1B.substring(2),
                question6_1C : result.question6_1C.substring(2),
                question6_1D : result.question6_1D.substring(2),
                question6_1E : result.question6_1E.substring(2),
                question6_2A : result.question6_2A.substring(2),
                question6_2B : result.question6_2B.substring(2),
                question6_2C : result.question6_2C.substring(2),
                question6_2D : result.question6_2D.substring(2),
                question6_2E : result.question6_2E.substring(2),
                question6_3A : result.question6_3A.substring(2),
                question6_3B : result.question6_3B.substring(2),
                question6_3C : result.question6_3C.substring(2),
                question6_3D : result.question6_3D.substring(2),
                question6_3E : result.question6_3E.substring(2),
              },
            };

            testMutate(finalEligibilityTestData);
          }}
          questions={questions || []}
        />
      ),
    },
    {
      label : 'accountOpeningSteps_suitabilityTest_modal_testResult_text',
      form  : (
        <EligibilityTestScoreForm
          defaultValues={eligibilityStoreStepData}
          goBack={prevStep}
          isSubmitLoading={isAccountMutateLoading}
          onSubmit={(result) => {
            const storeData = { ...eligibilityStoreStepData, ...result };

            setEligibilityStoreStepData(storeData);

            const accountComplianceTest = {
              score : +result.score,
              risk  : result.risk,
              appliedRisk:
                result.risk +
                result.appliedRisk
                  .map((x: DynamicType) => x.confirmation)
                  .filter(Boolean).length,
            };

            accountMutate({ requestBody: accountComplianceTest, storeData });
          }}
          result={eligibilityResults}
        />
      ),
    },
  ];

  return (
    <>
      <Flex direction='row' mt='6'>
        <InfoIcon fill='basic.400' height='5' width='5' />

        <TranslatedText
          fontSize='14px'
          label='accountOpeningSteps_suitabilityTest_modal_info1_text'
          lineHeight='19px'
          ml='2'
          variant='info'
        />
      </Flex>

      <Steps
        activeStep={activeStep}
        colorScheme='red'
        my='43px'
        responsive={false}
        size='xs'
      >
        {steps.map((step, index) => (
          <Step
            fontFamily='roboto'
            key={index}
            label={
              <TranslatedText
                label={step.label}
                variant={!isAboveMd ? 'mobile' : 'body2'}
              />
            }
          >
            {step.form}
          </Step>
        ))}
      </Steps>
    </>
  );
};

export default EligibilityTest;
