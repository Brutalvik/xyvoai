"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { addToast } from "@heroui/react";

const IssueSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  effort: Yup.number().min(1).max(100).required("Effort is required"),
  priority: Yup.string().required("Priority is required"),
  assignee: Yup.string().required("Assignee is required"),
  sprintId: Yup.string().required("Sprint is required"),
});

type Sprint = { id: string; name: string };
type User = { id: string; name: string };

type Props = {
  sprints: Sprint[];
  users: User[];
  onSubmit: (values: any) => void;
};

export default function IssueCreateForm({ sprints, users, onSubmit }: Props) {
  const t = useTranslations("Issue");

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        effort: 1,
        priority: "medium",
        assignee: "",
        sprintId: "",
      }}
      validationSchema={IssueSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        addToast({ title: "Issue created successfully", color: "success" });
        resetForm();
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4 p-4 max-w-xl shadow rounded-lg">
          <h2 className="text-lg font-semibold">{t("createIssue")}</h2>

          <Field name="title">
            {({ field }: any) => (
              <Input
                label={t("title")}
                {...field}
                error={touched.title && errors.title}
              />
            )}
          </Field>

          <Field name="description">
            {({ field }: any) => (
              <Textarea
                label={t("description")}
                rows={4}
                {...field}
                error={touched.description && errors.description}
              />
            )}
          </Field>

          <Field name="effort">
            {({ field }: any) => (
              <Input
                label={t("effort")}
                max={100}
                min={1}
                type="number"
                {...field}
                error={touched.effort && errors.effort}
              />
            )}
          </Field>

          <Field name="priority">
            {({ field, form }: any) => (
              <Select
                className="max-w-xs"
                errorMessage={touched.priority && errors.priority}
                isInvalid={touched.priority && !!errors.priority}
                label={t("priority")}
                selectedKeys={field.value}
                onSelectionChange={(key) => form.setFieldValue(field.name, key)}
              >
                <SelectItem key="low">{t("priorityLow")}</SelectItem>
                <SelectItem key="medium">{t("priorityMedium")}</SelectItem>
                <SelectItem key="high">{t("priorityHigh")}</SelectItem>
                <SelectItem key="critical">{t("priorityCritical")}</SelectItem>
              </Select>
            )}
          </Field>

          <Field name="assignee">
            {({ field, form }: any) => (
              <Select
                className="max-w-xs"
                errorMessage={touched.assignee && errors.assignee}
                isInvalid={touched.assignee && !!errors.assignee}
                label={t("assignee")}
                selectedKeys={field.value}
                onSelectionChange={(key) => form.setFieldValue(field.name, key)}
              >
                {users.map((u) => (
                  <SelectItem key={u.id}>{u.name}</SelectItem>
                ))}
              </Select>
            )}
          </Field>

          <Field name="sprintId">
            {({ field, form }: any) => (
              <Select
                className="max-w-xs"
                errorMessage={touched.sprintId && errors.sprintId}
                isInvalid={touched.sprintId && !!errors.sprintId}
                label={t("sprint")}
                selectedKeys={field.value}
                onSelectionChange={(key) => form.setFieldValue(field.name, key)}
              >
                {sprints.map((s) => (
                  <SelectItem key={s.id}>{s.name}</SelectItem>
                ))}
              </Select>
            )}
          </Field>

          <Button isLoading={isSubmitting} type="submit" variant="solid">
            {t("create")}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
