import RatingSelector from "@/components/RatingSelector";
import ReviewCardStyle from "@/styles/reviews/ReviewsCard.module.css"
import {Skeleton} from "@nextui-org/skeleton";
import {FormatDateLiterary} from "@/utils/DateFormatter";

interface Props {
  review: Review
  isLoading: boolean,
}
export default function ReviewCard({review, isLoading}: Readonly<Props>) {
  const showSkeleton = () => {
    return (
      <div className={ReviewCardStyle.skeleton}>
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
          <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "40px"}}>
            <div style={{height: "40px"}} />
          </Skeleton>
          <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "40px"}}>
            <div style={{height: "40px"}} />
          </Skeleton>
          <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "40px"}}>
            <div style={{height: "40px"}} />
          </Skeleton>
          <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "40px"}}>
            <div style={{height: "40px"}} />
          </Skeleton>
          <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "40px"}}>
            <div style={{height: "40px"}} />
          </Skeleton>
        </div>
        <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "300px"}}>
          <div style={{height: "20px"}} />
        </Skeleton>
        <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "430px"}}>
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "450px"}}>
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className={ReviewCardStyle.roundedElement} style={{width: "420px"}}>
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    )
  }

  const card = () => {
    return (
      <div className={ReviewCardStyle.container}>
        <RatingSelector
          isEditable={false}
          rating={review.rating}
          setRating={() => {}}
          showTotalInfo={false}>
        </RatingSelector>
        <h3 className={ReviewCardStyle.name}>{review.clientName}</h3>
        {review.comment && review.comment.trim() !== "" && (
          <p className={ReviewCardStyle.paragraph}>"{review.comment}"</p>
        )}
        <span className={ReviewCardStyle.dateStyle}>Posted on {FormatDateLiterary(review.createdAt)}</span>
      </div>
    )
  }

  return isLoading ? showSkeleton() : card();
}
