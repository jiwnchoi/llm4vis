import { Flex, FlexProps, IconButton } from "@chakra-ui/react";
import { useColorMode, useMessages } from "@hooks";
import { useMessageStore } from "@stores";
import { FaArrowDown } from "react-icons/fa";
import Content from "./Content";
import TeacherView from "./TeacherView";

const Messages = (props: FlexProps) => {
  const { colorMode } = useColorMode();
  const messages = useMessageStore((state) => state.messages);
  const { chatBoxRef, chatBoxAtBottom, scrollToBottom } = useMessages();

  return (
    <Flex
      {...props}
      ref={chatBoxRef}
      css={{
        "&::-webkit-scrollbar": {
          backgroundColor: "transparent",
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor:
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      {messages.map((_, index) => (
        <Content key={index} index={index} />
      ))}
      <TeacherView />

      <IconButton
        icon={<FaArrowDown />}
        onClick={scrollToBottom}
        position="absolute"
        top={650}
        left={"calc(50% - 300px)"}
        display={chatBoxAtBottom ? "none" : "flex"}
        isDisabled={chatBoxAtBottom!}
        zIndex={100}
        aria-label={"scroll to bottom"}
      />
    </Flex>
  );
};

export default Messages;
