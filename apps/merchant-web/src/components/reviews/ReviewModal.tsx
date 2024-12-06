import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import RatingSelector from "@/components/RatingSelector";
import {FormikProps, useFormik} from "formik";
import {EditableInput} from "@/components/atoms/inputs/EditableInput";
import {defaultReviewFormData, ReviewFormData, ReviewFormSchema} from "@/schemes/reviews/ReviewFormSchema";
import {validateWithZod} from "@/utils/ZodFunctions";
import ModalStyle from "@/styles/store-catalog/Modal.module.css";
import axiosInstance from "@/request/AxiosConfig";
import {useAuth} from "@/commons/context/AuthContext";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";
import {useReviewsContext} from "@/contexts/ReviewsContext";

export default function ReviewModal() {
  const [ratingForm, setRatingForm] = useState(0);
  const {productId, rating, totalReviews, refreshReviews} = useReviewsContext();
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const auth = useAuth()
  const router = useRouter();

  const formik: FormikProps<ReviewFormData> = useFormik<ReviewFormData>({
    initialValues: defaultReviewFormData,
    validate: validateWithZod(ReviewFormSchema),
    onSubmit: values => {
      if (auth.user?.userId == null) {
        router.replace("/login");
      } else {
        axiosInstance.post(`/review/ProductReview/${productId}`, {
          clientId: auth.user?.userId,
          clientName: auth.user?.displayName,
          rating: ratingForm,
          comment: values.comment
        }).catch(e => toast.error(e.response.data.message))
          .finally(refreshReviews);
      }
    }
  });

  return (
    <>
      <RatingSelector
        rating={rating}
        setRating={setRatingForm}
        handleChange={onOpen}
        totalReviews={totalReviews}
        horizontalAlignment={true}
        showTotalInfo={true}
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
              <div style={{display:"flex", flexDirection: "row", justifyContent: "center", paddingBottom: "24px"}}>
                <RatingSelector
                  rating={ratingForm}
                  setRating={setRatingForm}
                  showTotalInfo={false}
                  horizontalAlignment={false}
                ></RatingSelector>
              </div>
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
                multiline={true}
              >
              </EditableInput>
          </ModalBody>
          <ModalFooter>
            <Button
              className={ModalStyle.secondaryButton}
              onPress={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              className={ModalStyle.primaryButton}
              onPress={() => {
                formik.handleSubmit();
                onClose();
              }}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}