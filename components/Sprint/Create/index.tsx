"use client";

import React, { useMemo } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { addToast } from "@heroui/react";

import SprintDateRangePicker from "@/components/ui/DateRangePicker";

const SprintSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  goal: Yup.string().required("Goal is required"),
  duration: Yup.object()
    .shape({
      start: Yup.date().required("Start date is required"),
      end: Yup.date().required("End date is required"),
    })
    .required("Duration is required"),
  velocity: Yup.number().min(0).required("Velocity is required"),
  capacity: Yup.number().min(0).required("Capacity is required"),
  state: Yup.string().required("State is required"),
  team: Yup.string().required("Team is required"),
  focusFactor: Yup.number().min(0).max(1).required("Focus factor is required"),
  burndownType: Yup.string().required("Burndown type is required"),
  timezone: Yup.string().required("Timezone is required"),
  autoAssignTasks: Yup.boolean(),
  color: Yup.string(),
});

const sprintColors = [
  "#22c55e",
  "#3b82f6",
  "#facc15",
  "#f97316",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

type Props = {
  teams: { id: string; name: string }[];
  onSubmit: (values: any) => void;
};

function getNext2WeekRange(): { start: CalendarDate; end: CalendarDate } {
  const start = today(getLocalTimeZone());
  const end = start.add({ days: 13 });

  return { start, end };
}

function getRandomColor(): string {
  const index = Math.floor(Math.random() * sprintColors.length);

  return sprintColors[index];
}

export default function CreateSprintForm({ teams, onSubmit }: Props) {
  const t = useTranslations("Sprint");

  const defaultDuration = useMemo(() => getNext2WeekRange(), []);
  const sprintColor = useMemo(() => getRandomColor(), []);

  return (
    <Formik
      initialValues={{
        name: "",
        goal: "",
        duration: defaultDuration,
        velocity: 0,
        capacity: 0,
        state: "planned",
        team: "",
        focusFactor: 0.8,
        burndownType: "storyPoints",
        timezone: getLocalTimeZone(),
        autoAssignTasks: false,
        color: sprintColor,
      }}
      validationSchema={SprintSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        addToast({ title: "Sprint created successfully", color: "success" });
        resetForm();
      }}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="space-y-4 max-w-xl p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">{t("createSprint")}</h2>

          <Field name="name">
            {({ field }: any) => (
              <Input
                label={t("name")}
                {...field}
                error={touched.name && errors.name}
              />
            )}
          </Field>

          <Field name="goal">
            {({ field }: any) => (
              <Textarea
                label={t("goal")}
                rows={3}
                {...field}
                error={touched.goal && errors.goal}
              />
            )}
          </Field>

          <SprintDateRangePicker
            value={values.duration}
            onChange={(val) => setFieldValue("duration", val)}
          />

          <Field name="velocity">
            {({ field }: any) => (
              <Input
                label={t("velocity")}
                min={0}
                type="number"
                {...field}
                error={touched.velocity && errors.velocity}
              />
            )}
          </Field>

          <Field name="capacity">
            {({ field }: any) => (
              <Input
                label={t("capacity")}
                min={0}
                type="number"
                {...field}
                error={touched.capacity && errors.capacity}
              />
            )}
          </Field>

          <Field name="state">
            {({ field }: any) => (
              <Select
                errorMessage={touched.state && errors.state}
                isInvalid={touched.state && !!errors.state}
                label={t("state")}
                selectedKeys={field.value}
                onSelectionChange={(key) =>
                  setFieldValue("state", key.toString())
                }
              >
                <SelectItem key="planned">{t("planned")}</SelectItem>
                <SelectItem key="active">{t("active")}</SelectItem>
                <SelectItem key="completed">{t("completed")}</SelectItem>
              </Select>
            )}
          </Field>

          {/* Team Field with Create Button */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Field name="team">
                {({ field }: any) => (
                  <Select
                    errorMessage={touched.team && errors.team}
                    isDisabled={teams.length === 0}
                    isInvalid={touched.team && !!errors.team}
                    label={t("team")}
                    selectedKeys={field.value}
                    onSelectionChange={(key) =>
                      setFieldValue("team", key.toString())
                    }
                  >
                    {teams.map((team) => (
                      <SelectItem key={team.id}>{team.name}</SelectItem>
                    ))}
                  </Select>
                )}
              </Field>
            </div>
            <Button
              type="button"
              variant="faded"
              onClick={() => {
                // Implement navigation or modal trigger here
                addToast({ title: "Open create team modal", color: "primary" });
              }}
            >
              + {t("createTeam", { defaultValue: "Create Team" })}
            </Button>
          </div>

          <Field name="focusFactor">
            {({ field }: any) => (
              <Input
                label={t("focusFactor")}
                max={1}
                min={0}
                step={0.1}
                type="number"
                {...field}
                error={touched.focusFactor && errors.focusFactor}
              />
            )}
          </Field>

          <Field name="burndownType">
            {({ field }: any) => (
              <Select
                errorMessage={touched.burndownType && errors.burndownType}
                isInvalid={touched.burndownType && !!errors.burndownType}
                label={t("burndownType")}
                selectedKeys={field.value}
                onSelectionChange={(key) =>
                  setFieldValue("burndownType", key.toString())
                }
              >
                <SelectItem key="storyPoints">{t("storyPoints")}</SelectItem>
                <SelectItem key="tasks">{t("tasks")}</SelectItem>
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

          <Input
            disabled
            checked={false}
            className="cursor-not-allowed"
            label={t("autoAssignTasks")}
            type="checkbox"
          />

          <Button isLoading={isSubmitting} type="submit" variant="solid">
            {t("create")}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
