"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button, Input, addToast } from "@heroui/react";
import { useAppDispatch } from "@/store/hooks";
import { postNotification } from "@/store/slices/notificationSlice";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface NotificationPageProps {
  userPermissions: string[];
  onSuccessRedirect: () => void;
}

export default function NotificationPageComponent({
  userPermissions,
  onSuccessRedirect,
}: NotificationPageProps) {
  const dispatch = useAppDispatch();

  const canPost = useMemo(() => {
    const allowed = [
      "admin:full",
      "notifications:create",
      "notifications:update",
      "notifications:delete",
    ];
    return userPermissions.some((p) => allowed.includes(p));
  }, [userPermissions]);

  const [title, setTitle] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const handlePost = async () => {
    const description = quillRef.current?.root.innerHTML || "";

    if (!title.trim() || !description.trim() || description === "<p><br></p>") {
      addToast({
        title: "Error",
        description: "Title and Description are required",
        color: "danger",
        timeout: 3000,
      });
      return;
    }

    setIsPosting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      images.forEach((img) => formData.append("images", img));

      await dispatch(postNotification(formData)).unwrap();

      addToast({
        title: "Success",
        description: "Notification posted!",
        color: "success",
        timeout: 3000,
      });

      setTitle("");
      quillRef.current?.setContents([]);
      setImages([]);
      onSuccessRedirect();
    } catch (err: any) {
      addToast({
        title: "Error",
        description: err.message || "Failed to post",
        color: "danger",
        timeout: 3000,
      });
    } finally {
      setIsPosting(false);
    }
  };

  if (!canPost) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p className="text-foreground-400 mt-2">
          You don’t have permission to post notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 sm:space-y-6">
      <h1 className="text-2xl font-bold">Post a Notification</h1>

      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />

      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <div
          ref={editorRef}
          className="bg-white dark:bg-neutral-900 min-h-[200px] mb-4 border border-border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Attachments</label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex justify-end">
        <Button
          color="primary"
          isLoading={isPosting}
          onPress={handlePost}
          size="lg"
        >
          Post Notification
        </Button>
      </div>
    </div>
  );
}
