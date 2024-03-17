import { Flex, Icon, IconButton, Spinner, Textarea } from "@chakra-ui/react";
import useMessages from "@hooks/useMessages";
import { IMessage, IPrompt } from "@shared/types";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { FaArrowUp } from "react-icons/fa6";

const handleKeyDown = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  props: FormikProps<IPrompt>,
) => {
  if (e.key === "Enter" && props.values.prompt === "") {
    e.preventDefault();
  } else if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    props.submitForm();
  } else if (e.key === "Enter" && e.shiftKey && props.values.prompt !== "") {
    e.preventDefault();
    e.stopPropagation();
    props.setFieldValue("prompt", props.values.prompt + "\n");
  }
};

interface IPromptViewProps {
  appendUserMessage: (message: IMessage) => void;
  streaming: boolean;
}

export default function PromptView({
  appendUserMessage,
  streaming,
}: IPromptViewProps) {
  return (
    <Flex
      flexDir={"row"}
      gap={2}
      p={2}
      borderWidth={1}
      borderColor={"gray.100"}
      borderRadius={"md"}
      _focusWithin={{ borderColor: "blue.500" }}
    >
      <Formik
        initialValues={{ prompt: "" }}
        onSubmit={(values, actions) => {
          appendUserMessage({
            role: "user",
            content: values.prompt,
            type: "message",
          });
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form style={{ display: "flex", minWidth: "100%" }}>
            <Field name="prompt" as="textarea">
              {({ field }: FieldProps) => (
                <Textarea
                  {...field}
                  fontSize={"sm"}
                  variant={"none"}
                  placeholder="Describe what your visualization would be..."
                  width={"full"}
                  border={"none"}
                  resize={"none"}
                  _focus={{ border: "none", borderWidth: 0 }}
                  _placeholder={{ color: "gray.400" }}
                  onKeyDown={(e) => handleKeyDown(e, props)}
                />
              )}
            </Field>
            <Flex direction="column" gap={2}>
              <IconButton
                type="submit"
                icon={streaming ? <Spinner /> : <Icon as={FaArrowUp} />}
                isLoading={props.isSubmitting || streaming}
                isDisabled={props.isSubmitting || props.values.prompt === ""}
                aria-label="Sending Button"
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
