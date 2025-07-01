"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HiBan, HiBadgeCheck, HiExclamation } from "react-icons/hi";

import XyvoLoader from "@/components/ui/XyvoLoader";
import AuthFormLayout from "@/components/ui/Auth/AuthFormLayout";
import { PasswordInput } from "@/components/ui/Auth/PasswordInput";
import { passwordRules } from "@/utils";
import { useAppDispatch } from "@/store/hooks";
import { meThunk, signInThunk } from "@/store/auth/thunks";
import { setUser } from "@/store/slices/userSlice";

export default function Signin() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("signin");
  const v = useTranslations("signinvalidation");

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(v("invalidEmail")).required(v("required")),
      password: Yup.string()
        .min(8, v("passwordLength"))
        .matches(passwordRules, { message: v("passwordPattern") })
        .required(v("required")),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        await dispatch(signInThunk(values)).unwrap();
        const user = await dispatch(meThunk()).unwrap();
        dispatch(setUser(user));
        addToast({
          title: t("successTitle"),
          description: t("successMessage"),
          color: "success",
          icon: <HiBadgeCheck />,
        });
        router.push("/dashboard/projects");
      } catch (error: any) {
        addToast({
          title: t("errorTitle"),
          description: error || t("errorMessage"),
          color: "danger",
          icon: <HiBan />,
        });
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (searchParams.get("redirected") === "1") {
      addToast({
        title: t("warningTitle"),
        description: t("warningMessage"),
        color: "warning",
        icon: <HiExclamation />,
      });

      const url = new URL(window.location.href);
      url.searchParams.delete("redirected");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <XyvoLoader />
        </div>
      ) : (
        <AuthFormLayout
          title={t("title")}
          subtitle=""
          alternativeAuthLink={{
            text: t("noAccount"),
            href: "/auth/signup",
            linkText: t("signup"),
          }}
          showSocials={false}
        >
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              label={t("email")}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.email && formik.errors.email)}
              errorMessage={
                formik.touched.email ? formik.errors.email : undefined
              }
              variant="bordered"
              size="sm"
            />
            <PasswordInput
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.password && formik.errors.password)}
              errorMessage={
                formik.touched.password ? formik.errors.password : undefined
              }
              size="sm"
            />
            <Button
              type="submit"
              variant="solid"
              color="primary"
              className="w-full"
              isLoading={formik.isSubmitting}
            >
              {t("continue")}
            </Button>
          </form>
        </AuthFormLayout>
      )}
    </motion.div>
  );
}
