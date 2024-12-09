import z from "zod"

export const ReviewFormSchema = z.object({
  comment: z.string()
    .max(500, "Your opinion could only contain 500 characters")
});

export type ReviewFormData = z.infer<typeof ReviewFormSchema>;

export const defaultReviewFormData: ReviewFormData = {
  comment: ""
}
