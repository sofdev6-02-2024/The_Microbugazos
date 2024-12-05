import z from "zod"

export const ReviewFormSchema = z.object({
  rating: z.number()
    .min(0, "Rating selected should be greater than zero")
    .max(5, "Rating selected should be less than five"),
  comment: z.string()
    .max(500, "Your opinion could only contain 500 characters")
});

export type ReviewFormData = z.infer<typeof ReviewFormSchema>;

export const defaultReviewFormData: ReviewFormData = {
  rating: 0,
  comment: ""
}
