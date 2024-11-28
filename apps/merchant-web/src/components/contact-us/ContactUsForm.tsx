"use client";

import React from "react";
import { FormikProps, useFormik } from "formik";
import { toast } from "sonner";
import { EditableInput } from "@/components/atoms/inputs/EditableInput";
import { ContactFormData } from "@/schemes/contact-us-form/ContactUsDto";
import styles from "@/styles/contact-us/ContactUsForm.module.css"
import {createContactUsMessage} from "@/request/ContactUsMessageRequest";
import {ContactFormSchema, defaultContactData} from "@/schemes/contact-us-form/ContactFormSchema";
import { z } from "zod";

const validateWithZod = (schema: z.ZodSchema) => (values: any) => {
  try {
    schema.parse(values);
    return {};
  } catch (error) {
    const zodErrors = (error as z.ZodError).flatten();
    return zodErrors.fieldErrors;
  }
};

const ContactForm: React.FC = () => {
  const formik: FormikProps<ContactFormData> = useFormik<ContactFormData>({
    initialValues: defaultContactData,
    validate: validateWithZod(ContactFormSchema),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await createContactUsMessage(values);
        if (response != null) {
          toast.success(
            "Your request has been sent. It will be analyzed and you will receive a reply to the e-mail address you provided."
          );
          resetForm();
        } else {
          toast.error("Error submitting the form. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error submitting the form. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const onBlur = (field: string) => {
    formik.handleBlur(field);
    formik.setFieldTouched(field, true);
  };

  return (
    <div className={styles["contact-us"]}>
      <form onSubmit={formik.handleSubmit}>
        <EditableInput
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          label="Name"
          placeholder="Enter your name"
          name="name"
          id="name"
          error={formik.errors.name}
          handleBlur={onBlur}
          touched={formik.touched.name}
          isEditable={true}
        />

        <EditableInput
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Email"
          placeholder="Enter your email"
          name="email"
          id="email"
          error={formik.errors.email}
          handleBlur={onBlur}
          touched={formik.touched.email}
          isEditable={true}
        />

        <EditableInput
          type="text"
          value={formik.values.message}
          onChange={formik.handleChange}
          label="Message"
          placeholder="Enter your message"
          name="message"
          id="message"
          error={formik.errors.message}
          handleBlur={onBlur}
          touched={formik.touched.message}
          isEditable={true}
          multiline={true}
          rows={6}
        />

        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;