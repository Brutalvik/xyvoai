"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
  Divider,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchTaskSettings,
  createOrUpdateTaskSettings,
} from "@/store/app/taskSettingsThunk";
import { TaskSettings } from "@/store/slices/taskSettingsSlice";

export default function TaskSettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const currentSettings = useSelector(
    (state: RootState) => state.taskSettings.current
  );

  const [form, setForm] = useState<TaskSettings>({
    namingConvention: "uuid",
    prefix: "",
    suffix: "",
    startNumber: 1,
    zeroPadding: 3,

    defaultAssignee: "",
    defaultPriority: "medium",
    defaultActivity: "Development",
    defaultOriginalEstimate: 0,
    defaultTags: [],

    defaultView: "kanban",
    editableTitleByDefault: true,
    editableDescriptionByDefault: true,
    allowComments: true,
  });

  // Load current settings
  useEffect(() => {
    dispatch(fetchTaskSettings());
  }, [dispatch]);

  // Update form when settings are loaded
  useEffect(() => {
    if (currentSettings) {
      setForm({
        namingConvention: currentSettings.namingConvention ?? "uuid",
        prefix: currentSettings.prefix ?? "",
        suffix: currentSettings.suffix ?? "",
        startNumber: currentSettings.startNumber ?? 1,
        zeroPadding: currentSettings.zeroPadding ?? 3,

        defaultAssignee: currentSettings.defaultAssignee ?? "",
        defaultPriority: currentSettings.defaultPriority ?? "medium",
        defaultActivity: currentSettings.defaultActivity ?? "Development",
        defaultOriginalEstimate: currentSettings.defaultOriginalEstimate ?? 0,
        defaultTags: currentSettings.defaultTags ?? [],

        defaultView: currentSettings.defaultView ?? "kanban",
        editableTitleByDefault: currentSettings.editableTitleByDefault ?? true,
        editableDescriptionByDefault:
          currentSettings.editableDescriptionByDefault ?? true,
        allowComments: currentSettings.allowComments ?? true,
      });
    }
  }, [currentSettings]);

  const handleSubmit = async () => {
    try {
      await dispatch(createOrUpdateTaskSettings(form)).unwrap();
      alert("✅ Task settings saved!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save task settings");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Task ID & Naming */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Task ID & Naming</h2>

        <div className="flex flex-wrap gap-4">
          <Select
            aria-label="Naming Convention"
            selectedKeys={[form.namingConvention]}
            onSelectionChange={(keys) =>
              setForm((prev) => ({
                ...prev,
                namingConvention: Array.from(
                  keys
                )[0] as TaskSettings["namingConvention"],
              }))
            }
          >
            <SelectItem key="sequential">Sequential</SelectItem>
            <SelectItem key="date">Date Based</SelectItem>
            <SelectItem key="uuid">UUID</SelectItem>
            <SelectItem key="projectBased">Project Based</SelectItem>
          </Select>

          <Input
            label="Prefix"
            value={form.prefix ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, prefix: e.target.value }))
            }
          />

          <Input
            label="Suffix"
            value={form.suffix ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, suffix: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            type="number"
            label="Start Number"
            value={form.startNumber?.toString()}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                startNumber: Number(e.target.value),
              }))
            }
          />

          <Input
            type="number"
            label="Zero Padding"
            value={form.zeroPadding?.toString()}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                zeroPadding: Number(e.target.value),
              }))
            }
          />
        </div>
      </section>

      <Divider />

      {/* Defaults for New Tasks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Defaults for New Tasks</h2>

        <Input
          label="Default Assignee"
          value={form.defaultAssignee ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, defaultAssignee: e.target.value }))
          }
        />

        <Select
          aria-label="Default Priority"
          selectedKeys={[form.defaultPriority ?? "medium"]}
          onSelectionChange={(keys) =>
            setForm((prev) => ({
              ...prev,
              defaultPriority: Array.from(
                keys
              )[0] as TaskSettings["defaultPriority"],
            }))
          }
        >
          <SelectItem key="low">Low</SelectItem>
          <SelectItem key="medium">Medium</SelectItem>
          <SelectItem key="high">High</SelectItem>
          <SelectItem key="critical">Critical</SelectItem>
        </Select>

        <Input
          label="Default Activity"
          value={form.defaultActivity ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, defaultActivity: e.target.value }))
          }
        />

        <Input
          type="number"
          label="Default Original Estimate"
          value={form.defaultOriginalEstimate?.toString()}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              defaultOriginalEstimate: Number(e.target.value),
            }))
          }
        />

        <Textarea
          label="Default Tags (comma separated)"
          value={(form.defaultTags ?? []).join(", ")}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              defaultTags: e.target.value.split(",").map((t) => t.trim()),
            }))
          }
        />

        <Select
          aria-label="Default View"
          selectedKeys={[form.defaultView ?? "kanban"]}
          onSelectionChange={(keys) =>
            setForm((prev) => ({
              ...prev,
              defaultView: Array.from(keys)[0] as TaskSettings["defaultView"],
            }))
          }
        >
          <SelectItem key="kanban">Kanban</SelectItem>
          <SelectItem key="table">Table</SelectItem>
          <SelectItem key="gantt">Gantt</SelectItem>
          <SelectItem key="createTask">Create Task</SelectItem>
        </Select>

        <Checkbox
          isSelected={form.editableTitleByDefault ?? true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({
              ...prev,
              editableTitleByDefault: event.target.checked,
            }))
          }
        >
          Editable Title by Default
        </Checkbox>

        <Checkbox
          isSelected={form.editableDescriptionByDefault ?? true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({
              ...prev,
              editableDescriptionByDefault: event.target.checked,
            }))
          }
        >
          Editable Description by Default
        </Checkbox>

        <Checkbox
          isSelected={form.allowComments ?? true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({
              ...prev,
              allowComments: event.target.checked,
            }))
          }
        >
          Allow Comments
        </Checkbox>
      </section>

      <div className="flex justify-end mt-6">
        <Button color="primary" onPress={handleSubmit}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}
