"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { addToast } from "@heroui/react";

type CreateTeamFormProps = {
  onSubmit: (values: { name: string; description: string }) => void;
  onCancel?: () => void;
};

const TeamSchema = Yup.object().shape({
  name: Yup.string().required("Team name is required"),
  description: Yup.string(),
});

export default function CreateTeamForm({
  onSubmit,
  onCancel,
}: CreateTeamFormProps) {
  const t = useTranslations("Team");

  return (
    <Formik
      initialValues={{ name: "", description: "" }}
      validationSchema={TeamSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        addToast({ title: t("createSuccess"), color: "success" });
        resetForm();
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4 p-4 max-w-md bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">{t("createTeam")}</h2>

          <Field name="name">
            {({ field }: any) => (
              <Input
                label={t("name")}
                {...field}
                error={touched.name && errors.name}
                isRequired
              />
            )}
          </Field>

          <Field name="description">
            {({ field }: any) => (
              <Textarea
                label={t("description")}
                {...field}
                rows={3}
                error={touched.description && errors.description}
              />
            )}
          </Field>

          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="light" onClick={onCancel}>
                {t("cancel")}
              </Button>
            )}
            <Button type="submit" isLoading={isSubmitting} variant="solid">
              {t("create")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
