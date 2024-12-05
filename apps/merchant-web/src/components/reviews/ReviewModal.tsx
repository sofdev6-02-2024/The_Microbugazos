import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import RatingSelector from "@/components/RatingSelector";
import {FormikProps, useFormik} from "formik";
import {EditableInput} from "@/components/atoms/inputs/EditableInput";
import {defaultReviewFormData, ReviewFormData, ReviewFormSchema} from "@/schemes/reviews/ReviewFormSchema";
import {validateWithZod} from "@/utils/ZodFunctions";

export default function ReviewModal() {
  const formik: FormikProps<ReviewFormData> = useFormik<ReviewFormData>({
    initialValues: defaultReviewFormData,
    validate: validateWithZod(ReviewFormSchema),
    onSubmit: values => {
      console.log(values);
    }
  });
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <RatingSelector
        rating={formik.values.rating}
        handleChange={onOpen}
      ></RatingSelector>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton
      >
        <ModalContent>
          <ModalHeader>
            <h3>Add your review...</h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <RatingSelector rating={formik.values.rating}></RatingSelector>
              <EditableInput
                type="text"
                label="Comment:"
                id="comment"
                name="comment"
                placeholder="Add your opinion here (optional)"
                value={formik.values.comment}
                onChange={formik.handleChange}
                error={formik.errors.comment}
                touched={formik.touched.comment}
                handleBlur={formik.handleBlur}
                isEditable={true}
              >
              </EditableInput>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
