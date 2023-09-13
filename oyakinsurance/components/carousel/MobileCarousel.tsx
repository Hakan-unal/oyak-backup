import { Box, Image } from "@chakra-ui/react";
import React from "react";

import Carousel, { CarouselItem } from "components/core/Carousel";
import TranslatedText from "components/core/Text";

const MobileCarousel = () => (
  <Carousel>
    <CarouselItem>
      <Box p={2} w="full" whiteSpace="break-spaces">
        <Image
          alt="Mobil Kapsam 1"
          margin="auto"
          mb="6"
          src="/mobile-axa.svg"
          w="72"
        />
        <TranslatedText
          fontSize="16px"
          fontWeight="700"
          h="fit-content"
          label="promotion_phoneInsurance_promotion_explanation1_text"
          lineHeight="22px"
          mb="6"
          w="auto"
        />
        <TranslatedText
          h="fit-content"
          label="promotion_phoneInsurance_promotion_explanation2_text"
          mb="6"
          w="auto"
        />
        <TranslatedText
          fontSize="20px"
          fontWeight="700"
          label="promotion_phoneInsurance_promotion_question_subtitle"
          lineHeight="26px"
          mb="6"
        />
        <TranslatedText label="promotion_phoneInsurance_promotion_explanation3_text" />
      </Box>
    </CarouselItem>
    <CarouselItem>
      <Box p={2} w="full" whiteSpace="break-spaces">
        <Image
          alt="Mobil Kapsam 1"
          margin="auto"
          mb="2.5"
          src="/mobile-x.svg"
          w="64"
        />
        <TranslatedText
          label="promotion_phoneInsurance_coverage_question_subtitle"
          variant="header2"
        />
        <TranslatedText
          h="fit-content"
          label="promotion_phoneInsurance_coverage_explanation1_text"
          w="auto"
        />
        <TranslatedText
          label="promotion_phoneInsurance_coverage_explanation2_text"
          variant="rBody2"
        />
      </Box>
    </CarouselItem>
    <CarouselItem>
      <Box p={2} w="full" whiteSpace="break-spaces">
        <Image
          alt="Mobil Kapsam 1"
          margin="auto"
          mb="2.5"
          src="/mobile-qm.svg"
          w="64"
        />
        <TranslatedText
          fontSize="20px"
          fontWeight="700"
          label="promotion_phoneInsurance_usage_howToUseIt_subtitle"
          lineHeight="26px"
        />

        <TranslatedText
          display="inline"
          label="promotion_phoneInsurance_usage_explanation1_text"
        />
        <TranslatedText
          display="inline"
          fontWeight="bold"
          label="promotion_phoneInsurance_usage_app_text"
          mx="1"
        />
        <TranslatedText
          display="inline"
          label="promotion_phoneInsurance_usage_explanation2_text"
        />

        <TranslatedText
          display="inline"
          fontWeight="bold"
          label="promotion_phoneInsurance_usage_informationForm_text"
          mx="1"
        />
        <TranslatedText
          display="inline"
          label="promotion_phoneInsurance_usage_explanation3_text"
        />
      </Box>
    </CarouselItem>
  </Carousel>
);

export default MobileCarousel;
