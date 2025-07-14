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
import { signInThunk } from "@/store/auth/thunks";
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
        const { user } = await dispatch(signInThunk(values)).unwrap();

        console.log(user);
        dispatch(setUser(user));
        addToast({
          title: t("successTitle"),
          description: t("successMessage"),
          color: "success",
          icon: <HiBadgeCheck />,
        });
        router.push("/overview/boards");
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
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <XyvoLoader />
        </div>
      ) : (
        <AuthFormLayout
          alternativeAuthLink={{
            text: t("noAccount"),
            href: "/auth/signup",
            linkText: t("signup"),
          }}
          showSocials={false}
          subtitle=""
          title={t("title")}
        >
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <Input
              errorMessage={
                formik.touched.email ? formik.errors.email : undefined
              }
              id="email"
              isInvalid={!!(formik.touched.email && formik.errors.email)}
              label={t("email")}
              name="email"
              size="sm"
              type="email"
              value={formik.values.email}
              variant="bordered"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <PasswordInput
              errorMessage={
                formik.touched.password ? formik.errors.password : undefined
              }
              id="password"
              isInvalid={!!(formik.touched.password && formik.errors.password)}
              name="password"
              size="sm"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Button
              className="w-full"
              color="primary"
              isLoading={formik.isSubmitting}
              type="submit"
              variant="solid"
            >
              {t("continue")}
            </Button>
          </form>
        </AuthFormLayout>
      )}
    </motion.div>
  );
}
