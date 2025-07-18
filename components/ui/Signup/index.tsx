"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { HiBan, HiBadgeCheck } from "react-icons/hi";

import XyvoLoader from "@/components/ui/XyvoLoader";
import AuthFormLayout from "@/components/ui/Auth/AuthFormLayout";
import { PhoneInput } from "@/components/ui/Auth/PhoneInput";
import { PasswordInput } from "@/components/ui/Auth/PasswordInput";
import PasswordTooltip from "@/components/ui/Auth/PasswordTooltip";
import { passwordRules } from "@/utils";
import { useAppDispatch } from "@/store/hooks";
import UsageTypeSelector from "@/components/Signup/UsageType";
import { signupThunk, signupWithUsageTypeThunk } from "@/store/auth/thunks";

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
        const res = await dispatch(signupThunk(values)).unwrap();

        if (res?.requireUsageType) {
          setStep("usagetype");
          router.replace(`${pathname}?step=usagetype`);

          return;
        }

        sessionStorage.removeItem("signup-form");
        addToast({
          title: t("successTitle"),
          description: t("successMessage"),
          color: "success",
          icon: <HiBadgeCheck />,
        });
        router.push(`/${locale}`);
      } catch (error: any) {
        addToast({
          title: t("errorTitle"),
          description: error || t("errorMessage"),
          color: "danger",
          icon: <HiBan />,
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

    try {
      await dispatch(signupWithUsageTypeThunk({ values, usageType })).unwrap();

      sessionStorage.removeItem("signup-form");
      addToast({
        title: t("successTitle"),
        description: t("successMessage"),
        color: "success",
      });
      router.push(`/${locale}`);
    } catch (error: any) {
      addToast({
        title: t("errorTitle"),
        description: error || t("errorMessage"),
        color: "danger",
      });
    } finally {
      setProcessingSignup(false);
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      {formik.isSubmitting ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <XyvoLoader />
        </div>
      ) : (
        <AuthFormLayout
          alternativeAuthLink={{
            text: t("haveAccount"),
            href: "/auth/signin",
            linkText: t("signin"),
          }}
          showSocials={false}
          subtitle=""
          title={t("title")}
        >
          <AnimatePresence mode="wait">
            {step === "usagetype" ? (
              <motion.div
                key="usagetype"
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
                exit={{ opacity: 0, x: -50 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <UsageTypeSelector
                  isInvalid={!usageType && hasTriedUsageSubmit}
                  value={usageType}
                  onChange={setUsageType}
                />
                <Button
                  className="w-full"
                  color="primary"
                  variant="solid"
                  onPress={handleUsageContinue}
                >
                  {t("continue")}
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="signup-form"
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
                exit={{ opacity: 0, x: 50 }}
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                onSubmit={formik.handleSubmit}
              >
                <Input
                  errorMessage={
                    formik.touched.name ? formik.errors.name : undefined
                  }
                  id="name"
                  isInvalid={!!(formik.touched.name && formik.errors.name)}
                  label={t("name")}
                  name="name"
                  size="sm"
                  value={formik.values.name}
                  variant="bordered"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
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
                <PhoneInput
                  errorMessage={
                    formik.touched.phone ? formik.errors.phone : undefined
                  }
                  formikCountryCode={formik.values.countryCode}
                  id="phone"
                  isInvalid={!!(formik.touched.phone && formik.errors.phone)}
                  name="phone"
                  setFormikFieldValue={formik.setFieldValue}
                  size="sm"
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <PasswordInput
                  errorMessage={
                    formik.touched.password ? formik.errors.password : undefined
                  }
                  id="password"
                  isInvalid={
                    !!(formik.touched.password && formik.errors.password)
                  }
                  name="password"
                  size="sm"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <PasswordTooltip />
                <Button
                  className="w-full"
                  color="primary"
                  isLoading={formik.isSubmitting}
                  type="submit"
                  variant="solid"
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
