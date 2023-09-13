/* eslint-disable react/jsx-no-useless-fragment */
import { Flex } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import useResizeObserver from 'use-resize-observer';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PDFDocumentProps {
  pdf: string;
  handleEndPage?: () => void;
  onLoadError?: () => void;
}

export default function PDFDocument({
  pdf,
  handleEndPage,
  onLoadError,
}: PDFDocumentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ pagesCount, setPagesCount ] = useState<number | null>(null);
  const { width } = useResizeObserver<HTMLDivElement>({ ref });
  const pages = Array(pagesCount).fill(null);
  const t = useTranslations();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPagesCount(numPages);
  }

  const checkApprox = (num1: number, num2: number, epsilon: number) =>
    num1 - num2 < epsilon;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = checkApprox(
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop,
      e.currentTarget.clientHeight,
      1.3,
    );

    if (bottom) {
      handleEndPage?.();
    }
  };

  return (
    <Flex ref={ref} w='full'>
      <Document
        file={pdf}
        loading={t('general_general_documentLoading_text')}
        onLoadError={onLoadError}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Flex
          border='2px solid'
          borderColor='basic.100'
          direction='column'
          maxH='55vh'
          onScroll={handleScroll}
          overflowX='hidden'
          overflowY='scroll'
        >
          {pages.map((_, index) => (
            <Page
              renderInteractiveForms
              key={`page_${index + 1}`}
              loading={<>{null}</>}
              pageIndex={index}
              pageNumber={index + 1}
              width={width}
            />
          ))}
        </Flex>
      </Document>
    </Flex>
  );
}
