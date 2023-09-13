import { useCallback, useState } from 'react';

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function useDisclosure(isOpenInit?: boolean): UseDisclosureReturn {
  const [ isOpen, setIsOpen ] = useState(!!isOpenInit);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, onOpen, onClose, onToggle };
}

export default useDisclosure;
