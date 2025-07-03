"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/react";
import { useTranslations } from "next-intl";

const teamColors = [
  "#22c55e",
  "#3b82f6",
  "#facc15",
  "#f97316",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

const TeamSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  visibility: Yup.string().required("Visibility is required"),
  lead: Yup.string().required("Team lead is required"),
  members: Yup.array().min(1, "Select at least one member"),
  timezone: Yup.string().required("Timezone is required"),
  tags: Yup.string(),
  color: Yup.string(),
});

type User = { id: string; name: string };
type Team = {
  name: string;
  description: string;
  visibility: string;
  lead: string;
  members: string[];
  timezone: string;
  tags?: string;
  color?: string;
};

type Props = {
  users: User[];
  onSubmit: (values: Team) => void;
  initialValues?: Team;
  isEdit?: boolean;
};

export default function TeamForm({
  users,
  onSubmit,
  initialValues,
  isEdit = false,
}: Props) {
  const t = useTranslations("Team");

  return (
    <Formik
      initialValues={
        initialValues || {
          name: "",
          description: "",
          visibility: "private",
          lead: "",
          members: [],
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          tags: "",
          color: teamColors[0],
        }
      }
      validationSchema={TeamSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        if (!isEdit) resetForm();
      }}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="space-y-4 max-w-full p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            {isEdit ? t("editTeam") : t("createTeam")}
          </h2>

          <Field name="name">
            {({ field }: any) => (
              <Input
                label={t("teamName")}
                {...field}
                error={touched.name && errors.name}
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

          <Field name="visibility">
            {({ field }: any) => (
              <Select
                label={t("visibility")}
                selectedKeys={[field.value]}
                onSelectionChange={(key) =>
                  setFieldValue("visibility", key.toString())
                }
              >
                <SelectItem key="private">{t("private")}</SelectItem>
                <SelectItem key="organization">{t("organization")}</SelectItem>
              </Select>
            )}
          </Field>

          <Field name="lead">
            {({ field }: any) => (
              <Select
                label={t("teamLead")}
                selectedKeys={[field.value]}
                onSelectionChange={(key) =>
                  setFieldValue("lead", key.toString())
                }
              >
                {users.map((user) => (
                  <SelectItem key={user.id}>{user.name}</SelectItem>
                ))}
              </Select>
            )}
          </Field>

          <Field name="members">
            {({ field }: any) => (
              <Select
                label={t("members")}
                selectionMode="multiple"
                selectedKeys={field.value}
                onSelectionChange={(keys) =>
                  setFieldValue("members", Array.from(keys))
                }
              >
                {users.map((user) => (
                  <SelectItem key={user.id}>{user.name}</SelectItem>
                ))}
              </Select>
            )}
          </Field>

          <Field name="timezone">
            {({ field }: any) => (
              <Input
                label={t("timezone")}
                {...field}
                error={touched.timezone && errors.timezone}
              />
            )}
          </Field>

          <Field name="tags">
            {({ field }: any) => <Input label={t("tags")} {...field} />}
          </Field>

          {/* Color Picker Substitute */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              {t("color")}
            </label>
            <div className="flex gap-2 mt-2">
              {teamColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFieldValue("color", color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    values.color === color
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <Button type="submit" isLoading={isSubmitting} variant="solid">
            {isEdit ? t("saveChanges") : t("create")}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
