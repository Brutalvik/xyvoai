"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import XyvoLoader from "@/components/ui/XyvoLoader";
import AuthFormLayout from "@/components/ui/Auth/AuthFormLayout";
import { PhoneInput } from "@/components/ui/Auth/PhoneInput";
import { PasswordInput } from "@/components/ui/Auth/PasswordInput";
import PasswordTooltip from "@/components/ui/Auth/PasswordTooltip";
import { passwordRules } from "@/utils";
import { useAppDispatch } from "@/store/hooks";
import { useTranslations, useLocale } from "next-intl";
import UsageTypeSelector from "@/components/Signup/UsageType";
import { CDN } from "@/config";

export default function Signup() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("signup");
  const v = useTranslations("validation");
  const locale = useLocale();

  const [prevLocale, setPrevLocale] = useState(locale);
  const [usageType, setUsageType] = useState<"personal" | "team" | "">("");
  const [hasTriedUsageSubmit, setHasTriedUsageSubmit] = useState(false);
  const [step, setStep] = useState<"form" | "usagetype">("form");
  const [processingSignup, setProcessingSignup] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
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
        sessionStorage.setItem("signup-form", JSON.stringify(values));
        const res = await fetch(`${CDN.userAuthUrl}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.countryCode + values.phone,
            password: values.password,
          }),
        });
        const data = await res.json();

        if (res.status === 202 && data.requireUsageType) {
          setStep("usagetype");
          router.replace(`${pathname}?step=usagetype`);
        }

        if (!res.ok) {
          throw new Error(data?.message || "Signup failed.");
        }
      } catch (error: any) {
        console.log("signed up", error);
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
    const saved = sessionStorage.getItem("signup-form");

    if (prevLocale !== locale && saved) {
      const parsed = JSON.parse(saved);
      formik.setValues(parsed);
    } else {
      sessionStorage.removeItem("signup-form");
    }

    setPrevLocale(locale);
  }, [locale]);

  const handleUsageContinue = async () => {
    setProcessingSignup(true);
    setHasTriedUsageSubmit(true);
    if (!usageType) return;

    const saved = sessionStorage.getItem("signup-form");
    if (!saved) return;

    const values = JSON.parse(saved);
    values.usageType = usageType;

    try {
      const res = await fetch(`${CDN.userAuthUrl}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.countryCode + values.phone,
          password: values.password,
          usageType: usageType,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Signup failed");

      sessionStorage.removeItem("signup-form");
      addToast({
        title: t("successTitle"),
        description: t("successMessage"),
        color: "success",
      });

      router.push(`/${locale}`);
      setProcessingSignup(false);
    } catch (error: any) {
      setProcessingSignup(false);
      addToast({
        title: t("errorTitle"),
        description: error.message || t("errorMessage"),
        color: "danger",
      });
    }
  };

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
          showSocials={false}
        >
          <AnimatePresence mode="wait">
            {step === "usagetype" ? (
              <motion.div
                key="usagetype"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <UsageTypeSelector
                  value={usageType}
                  onChange={setUsageType}
                  isInvalid={!usageType && hasTriedUsageSubmit}
                />
                <Button
                  onClick={handleUsageContinue}
                  variant="solid"
                  color="primary"
                  className="w-full"
                >
                  {t("continue")}
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="signup-form"
                onSubmit={formik.handleSubmit}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <Input
                  id="name"
                  name="name"
                  label={t("name")}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={!!(formik.touched.name && formik.errors.name)}
                  errorMessage={
                    formik.touched.name ? formik.errors.name : undefined
                  }
                  variant="bordered"
                  size="sm"
                />
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
                <Button
                  type="submit"
                  variant="solid"
                  color="primary"
                  className="w-full"
                  isLoading={formik.isSubmitting}
                >
                  {t("continue")}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </AuthFormLayout>
      )}
    </motion.div>
  );
}
