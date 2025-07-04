"use client";

import {
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
  Button,
  DatePicker,
  Chip,
  addToast,
} from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiInformationCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createProject } from "@/store/slices/projectsSlice";
import { Project } from "@/types";
import {
  parseDate,
  today,
  DateValue,
  CalendarDate,
} from "@internationalized/date";

export default function CreateProject() {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<CalendarDate | null>(null);
  const [endDate, setEndDate] = useState<CalendarDate | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      color: "#4f46e5",
      status: "active",
      visibility: "private",
      ai_tasks: false,
      priority: "",
      projectType: "",
      teamId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Project name is required"),
      description: Yup.string().required("Project description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      try {
        const payload: Partial<Project> = {
          name: values.name.trim(),
          description: values.description.trim(),
          color: values.color,
          status: values.status as Project["status"],
          visibility: values.visibility as Project["visibility"],
          ai_tasks: values.ai_tasks,
          tags,
          priority: values.priority as Project["priority"],
          projectType: values.projectType || undefined,
          start_date: startDate
            ? startDate.toDate("UTC").toISOString()
            : undefined,
          end_date: endDate ? endDate.toDate("UTC").toISOString() : undefined,
        };

        if (values.teamId) {
          payload.team = [{ id: values.teamId }]; // Should match your TeamMember interface
        }

        await dispatch(createProject(payload)).unwrap();

        addToast({
          title: "Project created successfully",
          color: "success",
          icon: <HiInformationCircle />,
        });

        resetForm();
        setTags([]);
        setStartDate(null);
        setEndDate(null);
        setTagInput("");
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

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    formik.setFieldValue("color", randomColor);
  };

  useEffect(() => {
    generateRandomColor();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Create New Project
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          name="name"
          label="Project Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <Textarea
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            name="priority"
            label="Priority"
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
          <Select
            name="projectType"
            label="Project Type"
            selectedKeys={[formik.values.projectType]}
            onSelectionChange={(val) =>
              formik.setFieldValue("projectType", Array.from(val)[0])
            }
          >
            <SelectItem key="Software">Software</SelectItem>
            <SelectItem key="Marketing">Marketing</SelectItem>
            <SelectItem key="Design">Design</SelectItem>
            <SelectItem key="Research">Research</SelectItem>
          </Select>
        </div>

        <Select
          name="teamId"
          label="Assign Team (Optional)"
          selectedKeys={[formik.values.teamId]}
          onSelectionChange={(val) =>
            formik.setFieldValue("teamId", Array.from(val)[0])
          }
        >
          <SelectItem key="">None</SelectItem>
          <SelectItem key="team-1">Alpha Team</SelectItem>
          <SelectItem key="team-2">Beta Team</SelectItem>
        </Select>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Tag Input + Chips */}
          <div className="flex-1">
            <Input
              name="tags"
              label="Tags"
              placeholder="Type and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, i) => (
                <Chip
                  key={i}
                  onClose={() => removeTag(tag)}
                  color="primary"
                  variant="flat"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>

          {/* Color Picker + Random Button */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mt-1">
              <Input
                name="color"
                type="color"
                className="w-3/4"
                size="lg"
                value={formik.values.color}
                onChange={formik.handleChange}
              />
              <Button
                type="button"
                variant="flat"
                className="w-1/4"
                onPress={generateRandomColor}
              >
                Random
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            minValue={today("UTC")}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            minValue={startDate ? startDate.add({ days: 1 }) : undefined}
          />
        </div>

        <div className="space-y-4">
          <Checkbox
            name="ai_tasks"
            isSelected={formik.values.ai_tasks}
            onChange={(e) => formik.setFieldValue("ai_tasks", e.target.checked)}
          >
            Enable AI to auto-generate tasks
          </Checkbox>
          <Button
            type="submit"
            variant="solid"
            isLoading={submitting}
            className="w-full"
          >
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
}
