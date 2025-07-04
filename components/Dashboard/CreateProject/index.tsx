"use client";

import {
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
  Button,
  addToast,
} from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createProject } from "@/store/slices/projectsSlice";
import { Project } from "@/types";

export default function CreateProject() {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      color: "#4f46e5",
      status: "active",
      visibility: "private",
      ai_tasks: false,
      start_date: "",
      end_date: "",
      tags: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Project name is required"),
      description: Yup.string().required("Project description is required"),
      status: Yup.string().required(),
      visibility: Yup.string().required(),
      color: Yup.string().required(),
      ai_tasks: Yup.boolean(),
      tags: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      try {
        const payload: Partial<Project> = {
          name: values.name.trim(),
          description: values.description.trim(),
          color: values.color,
          status: values.status as "active" | "completed" | "archived",
          visibility: values.visibility as "private" | "public",
          ai_tasks: values.ai_tasks,
          tags: values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
          start_date: values.start_date
            ? new Date(values.start_date).toISOString()
            : undefined,
          end_date: values.end_date
            ? new Date(values.end_date).toISOString()
            : undefined,
        };

        const res = await dispatch(createProject(payload)).unwrap();
        console.log(res);

        addToast({
          title: "Project created successfully",
          color: "success",
          icon: <HiInformationCircle />,
        });

        resetForm();
      } catch (err) {
        addToast({
          title: "Failed to create project",
          color: "danger",
          icon: <HiInformationCircle />,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    formik.setFieldValue("color", randomColor);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Create New Project
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          name="name"
          label="Project Name"
          placeholder="e.g. AI Strategy Launch"
          value={formik.values.name}
          onChange={formik.handleChange}
          isInvalid={!!(formik.touched.name && formik.errors.name)}
          errorMessage={formik.touched.name && formik.errors.name}
        />
        <Textarea
          name="description"
          label="Description"
          placeholder="Brief summary of the project goal..."
          value={formik.values.description}
          onChange={formik.handleChange}
          isInvalid={
            !!(formik.touched.description && formik.errors.description)
          }
          errorMessage={formik.touched.description && formik.errors.description}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            name="status"
            label="Status"
            selectedKeys={[formik.values.status]}
            onSelectionChange={(val) =>
              formik.setFieldValue("status", Array.from(val)[0])
            }
          >
            <SelectItem key="active">Active</SelectItem>
            <SelectItem key="completed">Completed</SelectItem>
            <SelectItem key="archived">Archived</SelectItem>
          </Select>
          <Select
            name="visibility"
            label="Visibility"
            selectedKeys={[formik.values.visibility]}
            onSelectionChange={(val) =>
              formik.setFieldValue("visibility", Array.from(val)[0])
            }
          >
            <SelectItem key="private">Private</SelectItem>
            <SelectItem key="public">Public</SelectItem>
          </Select>
        </div>
        <Input
          name="tags"
          label="Tags (comma-separated)"
          placeholder="e.g. ai, onboarding, research"
          value={formik.values.tags}
          onChange={formik.handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Project Color
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
              onPress={generateRandomColor}
            >
              Random
            </Button>
          </div>
        </div>
        <Checkbox
          name="ai_tasks"
          isSelected={formik.values.ai_tasks}
          onChange={(e) => formik.setFieldValue("ai_tasks", e.target.checked)}
        >
          Enable AI to auto-generate tasks
        </Checkbox>
        <Button type="submit" variant="solid" isLoading={submitting}>
          Create Project
        </Button>
      </form>
    </div>
  );
}
