/* eslint-disable no-param-reassign */
import { Box, Flex, Image } from "@chakra-ui/react";
import React, { Children, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

export const CarouselItem = ({ children, width }: any) => (
  <Box
    alignItems="center"
    display="inline-flex"
    h="fit-content"
    justifyContent="center"
    w={width}
  >
    {children}
  </Box>
);

const Carousel = ({ children, autoPlay = false }: any) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ paused, setPaused ] = useState(false);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = Children.count(children) - 1;
    } else if (newIndex >= Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && autoPlay) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft  : () => updateIndex(activeIndex + 1),
    onSwipedRight : () => updateIndex(activeIndex - 1),
  });

  return (
    <Flex
      align="center"
      direction="column"
      justify="center"
      {...handlers}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      overflow="hidden"
    >
      <Box
        mb={6}
        style={{
          transition: "transform 0.3",
          // transform  : `translateX(-${activeIndex * 100}%)`,
        }}
        w="full"
      >
        {Children.map(
          children,
          (child, index) =>
            index === activeIndex &&
            React.cloneElement(child, { width: "100%" }),
        )}
      </Box>
      <Image alt="or header" mb={4} src="/or_header.png" />
      <Flex
        border="1px solid"
        borderColor="basic.200"
        justifySelf="center"
        p="1.5"
        rounded="full"
        w="fit-content"
      >
        {React.Children.map(children, (_, index) => (
          <Box
            bg={index === activeIndex ? "basic.400" : "basic.200"}
            boxSize={3}
            mx={1.5}
            onClick={() => {
              updateIndex(index);
            }}
            rounded="full"
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Carousel;
