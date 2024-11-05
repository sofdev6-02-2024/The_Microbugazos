import { useFormik, FormikValues } from "formik";
import { ZodSchema } from "zod";

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema: ZodSchema<T>;
}

const useFormHandler = <T extends FormikValues>({
  initialValues,
  onSubmit,
  validationSchema,
}: UseFormProps<T>) => {
  const formik = useFormik<T>({
    initialValues,
    onSubmit,
    validate: (values) => {
      const result = validationSchema.safeParse(values);
      const errors: Record<string, string> = {};
      if (!result.success) {
        for (const error of result.error.errors) {
          errors[error.path[0]] = error.message;
        }
      }
      return errors;
    },
  });

  return formik;
};

export default useFormHandler;
