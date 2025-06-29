"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { useEffect } from "react";
import XyvoLoader from "@/components/ui/XyvoLoader";
import AuthFormLayout from "@/components/ui/Auth/AuthFormLayout";
import { PhoneInput } from "@/components/ui/Auth/PhoneInput";
import { PasswordInput } from "@/components/ui/Auth/PasswordInput";
import PasswordTooltip from "@/components/ui/Auth/PasswordTooltip";
import { passwordRules } from "@/utils";
import { useAppDispatch } from "@/store/hooks";
import { useTranslations } from "next-intl";

export default function Signup() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams?.get("email") || "";

  const t = useTranslations("register");
  const v = useTranslations("validation");

  const formik = useFormik({
    initialValues: {
      email: prefilledEmail,
      phone: "",
      name: "",
      password: "",
      countryCode: "+1",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(v("invalidEmail")).required(v("required")),
      name: Yup.string().min(2, v("nameShort")).required(v("required")),
      phone: Yup.string().min(10, v("phoneInvalid")).required(v("required")),
      password: Yup.string()
        .min(8, v("passwordLength"))
        .matches(passwordRules, { message: v("passwordPattern") })
        .required(v("required")),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch(
          "https://dkft2r7o6f.execute-api.us-east-2.amazonaws.com/live/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              phone: values.phone,
              password: values.password,
              countryCode: values.countryCode,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Registration failed.");
        }

        addToast({
          title: t("successTitle"),
          description: t("successMessage"),
          color: "success",
        });

        router.push("/auth?registered=1");
      } catch (error: any) {
        addToast({
          title: t("errorTitle"),
          description: error.message || t("errorMessage"),
          color: "danger",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {formik.isSubmitting ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <XyvoLoader />
        </div>
      ) : (
        <AuthFormLayout
          title={t("title")}
          subtitle=""
          alternativeAuthLink={{
            text: t("haveAccount"),
            href: "/auth",
            linkText: t("signin"),
          }}
          showSocials={false} //hardcoded now, replace in future once social auth is implemented
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <Input
                id="name"
                name="name"
                label={t("name")}
                type="text"
                variant="bordered"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!(formik.touched.name && formik.errors.name)}
                errorMessage={
                  formik.touched.name ? formik.errors.name : undefined
                }
                size="sm"
              />
              <Input
                id="email"
                name="email"
                type="email"
                label={t("email")}
                variant="bordered"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!(formik.touched.email && formik.errors.email)}
                errorMessage={
                  formik.touched.email ? formik.errors.email : undefined
                }
                size="sm"
              />

              <PhoneInput
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!(formik.touched.phone && formik.errors.phone)}
                errorMessage={
                  formik.touched.phone ? formik.errors.phone : undefined
                }
                setFormikFieldValue={formik.setFieldValue}
                formikCountryCode={formik.values.countryCode}
                size="sm"
              />

              <PasswordInput
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!(formik.touched.password && formik.errors.password)
                }
                errorMessage={
                  formik.touched.password ? formik.errors.password : undefined
                }
                size="sm"
              />

              <PasswordTooltip />
            </div>

            <div className="flex flex-col space-y-1 mt-4">
              {formik.isSubmitting ? (
                <p>{t("registering")}</p>
              ) : (
                <Button
                  type="submit"
                  variant="solid"
                  color="primary"
                  isDisabled={formik.isSubmitting}
                  className="w-full"
                >
                  {t("continue")}
                </Button>
              )}
            </div>
          </form>
        </AuthFormLayout>
      )}
    </motion.div>
  );
}
