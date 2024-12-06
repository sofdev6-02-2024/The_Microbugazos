import {useReviewsContext} from "@/contexts/ReviewsContext";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewSectionStyle from "@/styles/reviews/ReviewSection.module.css"
import PageSelector from "@/components/PageSelector";

export default function ReviewsSection() {
  const {reviews, isLoading, totalReviews, page, setPage} = useReviewsContext();
  return (
    <section className={ReviewSectionStyle.container}>
      <h2>All reviews ({totalReviews})</h2>
      <div className={ReviewSectionStyle.gridContainer}>
        {reviews?.reviews.items.map((item, index) => (
          <ReviewCard
            key={index}
            review={item} isLoading={isLoading}>
          </ReviewCard>
        ))}
      </div>
      {reviews == null && <p className={ReviewSectionStyle.noReviewsMessage}>It looks like no one has shared their thoughts about this product yet. Why not be the first to leave a review and help others make their choice?</p>}
      {reviews?.reviews.totalPages > 1 && <PageSelector page={page} setPage={setPage} pages={reviews?.reviews.totalPages!} maxVisible={3}/>}
    </section>
  )
}
