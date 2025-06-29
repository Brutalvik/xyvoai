"use client";

import { Input, Textarea } from "@heroui/input";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";
import { Button, addToast } from "@heroui/react";
import { DatePicker } from "@heroui/date-picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { HiInformationCircle } from "react-icons/hi";
import { format } from "date-fns";
import type { DateValue } from "@react-types/calendar";
import { useState } from "react";

export default function CreateProject() {
  const t = useTranslations("CreateProject");
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      dueDate: null as DateValue | null,
      startDate: null as DateValue | null,
      priority: "Medium",
      projectType: "Internal",
      visibility: "Private",
      tags: "",
      color: "#4f46e5",
      aiTasks: false,
      file: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("nameRequired")),
      description: Yup.string().required(t("descriptionRequired")),
      dueDate: Yup.mixed<DateValue>().nullable(),
      startDate: Yup.mixed<DateValue>().nullable(),
      priority: Yup.string().required(),
      projectType: Yup.string().required(),
      visibility: Yup.string().required(),
      tags: Yup.string(),
      color: Yup.string(),
      aiTasks: Yup.boolean(),
      file: Yup.mixed<File>().nullable(),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const payload = {
          ...values,
          startDate: values.startDate
            ? format(new Date(values.startDate.toString()), "yyyy-MM-dd")
            : null,
          dueDate: values.dueDate
            ? format(new Date(values.dueDate.toString()), "yyyy-MM-dd")
            : null,
        };

        const formData = new FormData();
        Object.entries(payload).forEach(([key, val]) => {
          if (key === "file" && val) formData.append("file", val as File);
          else formData.append(key, val as string);
        });

        const res = await fetch("/api/projects", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error();

        addToast({
          title: t("createSuccess"),
          color: "success",
          icon: <HiInformationCircle />,
        });
        formik.resetForm();
      } catch (e) {
        addToast({
          title: t("createError"),
          color: "danger",
          icon: <HiInformationCircle />,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        {t("createTitle")}
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          name="name"
          label={t("nameLabel")}
          placeholder={t("namePlaceholder")}
          value={formik.values.name}
          onChange={formik.handleChange}
          isInvalid={!!(formik.touched.name && formik.errors.name)}
          errorMessage={formik.touched.name && formik.errors.name}
        />
        <Textarea
          name="description"
          label={t("descriptionLabel")}
          placeholder={t("descriptionPlaceholder")}
          value={formik.values.description}
          onChange={formik.handleChange}
          errorMessage={formik.touched.description && formik.errors.description}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker
            name="startDate"
            label={t("startDateLabel")}
            value={formik.values.startDate}
            onChange={(val) => formik.setFieldValue("startDate", val)}
          />
          <DatePicker
            name="dueDate"
            label={t("dueDateLabel")}
            value={formik.values.dueDate}
            onChange={(val) => formik.setFieldValue("dueDate", val)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            name="projectType"
            label={t("typeLabel")}
            selectedKeys={[formik.values.projectType]}
            onSelectionChange={(val) =>
              formik.setFieldValue("projectType", Array.from(val)[0])
            }
          >
            <SelectItem key="Internal">Internal</SelectItem>
            <SelectItem key="Client">Client</SelectItem>
            <SelectItem key="Research">Research</SelectItem>
            <SelectItem key="AI">AI</SelectItem>
          </Select>
          <Select
            name="priority"
            label={t("priorityLabel")}
            selectedKeys={[formik.values.priority]}
            onSelectionChange={(val) =>
              formik.setFieldValue("priority", Array.from(val)[0])
            }
          >
            <SelectItem key="Low">Low</SelectItem>
            <SelectItem key="Medium">Medium</SelectItem>
            <SelectItem key="High">High</SelectItem>
            <SelectItem key="Urgent">Urgent</SelectItem>
          </Select>
        </div>
        <Input
          name="tags"
          label={t("tagsLabel")}
          placeholder="ai, onboarding, research"
          value={formik.values.tags}
          onChange={formik.handleChange}
        />
        <Select
          name="visibility"
          label={t("visibilityLabel")}
          selectedKeys={[formik.values.visibility]}
          onSelectionChange={(val) =>
            formik.setFieldValue("visibility", Array.from(val)[0])
          }
        >
          <SelectItem key="Public">Org</SelectItem>
          <SelectItem key="Private">Private</SelectItem>
          <SelectItem key="Public">Public</SelectItem>
        </Select>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            {t("colorLabel")}
          </label>
          <div className="flex items-center gap-2">
            <Input
              name="color"
              type="color"
              className="w-4/5"
              value={formik.values.color}
              onChange={formik.handleChange}
            />
            <Button
              type="button"
              variant="flat"
              className="w-1/5"
              onClick={() => {
                const randomColor = `#${Math.floor(Math.random() * 16777215)
                  .toString(16)
                  .padStart(6, "0")}`;
                formik.setFieldValue("color", randomColor);
              }}
            >
              {t("randomColor")}
            </Button>
          </div>
        </div>

        <Checkbox
          name="aiTasks"
          isSelected={formik.values.aiTasks}
          onChange={(e) => formik.setFieldValue("aiTasks", e.target.checked)}
        >
          {t("aiTasksLabel")}
        </Checkbox>
        <Input
          name="file"
          type="file"
          label={t("attachmentLabel")}
          onChange={(e) =>
            formik.setFieldValue("file", e.target.files?.[0] ?? null)
          }
        />
        <Button type="submit" variant="solid" isLoading={submitting}>
          {t("createButton")}
        </Button>
      </form>
    </div>
  );
}
