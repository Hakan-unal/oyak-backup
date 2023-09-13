/* eslint-disable react/jsx-no-useless-fragment */
import { Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface Props {
  pdf: string;
}
export default function PDFDocument({ pdf }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ pagesCount, setPagesCount ] = useState<number | null>(null);
  const pages = Array(pagesCount).fill(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPagesCount(numPages);
  }

  return (
    <Flex ref={ref} w="full">
      <Document
        file={pdf}
        loading={"Belge Yükleniyor"}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="svg"
      >
        {pages.map((_, index) => (
          <Page
            renderInteractiveForms
            key={`page_${index + 1}`}
            loading={<>{null}</>}
            pageIndex={index}
            pageNumber={index + 1}
            scale={0.65}
          />
        ))}
      </Document>
    </Flex>
  );
}
