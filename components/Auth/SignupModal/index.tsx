"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Link,
} from "@heroui/react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations, useLocale } from "next-intl";
import { useAppDispatch } from "@/store/hooks";
import { signupThunk } from "@/store/auth/thunks";
import { PasswordInput } from "@/components/ui/Auth/PasswordInput";
import { PhoneInput } from "@/components/ui/Auth/PhoneInput";
import { Logo } from "@/components/icons";
import { HiBan, HiBadgeCheck } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa6";
import { addToast } from "@heroui/react";
import { Mail, User } from "lucide-react";
import { passwordRules } from "@/utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect: () => void;
};

export default function SignupModal({
  isOpen,
  onClose,
  onSuccessRedirect,
}: Props) {
  const dispatch = useAppDispatch();
  const t = useTranslations("signup");
  const v = useTranslations("validation");
  const locale = useLocale();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      countryCode: "+1",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(v("invalidEmail")).required(v("required")),
      firstName: Yup.string().min(2, v("nameShort")).required(v("required")),
      lastName: Yup.string().min(2, v("nameShort")).required(v("required")),
      phone: Yup.string().min(10, v("phoneInvalid")).required(v("required")),
      password: Yup.string()
        .min(8, v("passwordLength"))
        .matches(passwordRules, { message: v("passwordPattern") })
        .required(v("required")),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Combine firstName and lastName as "firstname/lastname" for backend
        const backendValues = {
          ...values,
          name: `${values.firstName}/${values.lastName}`,
        };
        // Remove firstName and lastName from the object sent to backend
        const { firstName, lastName, ...valuesForBackend } = backendValues;

        await dispatch(signupThunk(valuesForBackend)).unwrap();
        addToast({
          title: t("successTitle"),
          description: t("successMessage"),
          color: "success",
          icon: <HiBadgeCheck />,
        });
        onClose();
        onSuccessRedirect();
      } catch (error: any) {
        addToast({
          title: t("errorTitle"),
          description: error?.message || t("errorMessage"),
          color: "danger",
          icon: <HiBan />,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      placement="top-center"
      backdrop="blur"
      size="sm"
    >
      <ModalContent className="overflow-hidden rounded-xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient Header */}
          <div className="bg-gradient-to-br from-[#080f17] to-[#2c7ad4] py-6 px-4 text-center">
            <div className="flex flex-row justify-center items-center gap-2">
              <Logo className="h-8 w-8 text-white" />
              <h1 className="text-white font-bold text-lg tracking-wide">
                YVO
              </h1>
            </div>
            <p className="text-white text-sm">{t("title")}</p>
          </div>

          {/* Form */}
          <ModalBody className="flex flex-col gap-4 py-6 px-6">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* First Name and Last Name */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="firstName"
                  label={t("firstName")}
                  placeholder={t("firstName")}
                  variant="bordered"
                  size="sm"
                  autoComplete="given-name"
                  isInvalid={!!(formik.touched.firstName && formik.errors.firstName)}
                  errorMessage={
                    formik.touched.firstName ? formik.errors.firstName : undefined
                  }
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  endContent={
                    <User
                      size={20}
                      className="text-gray-400 pointer-events-none mr-2"
                      aria-label={t("firstName")}
                    />
                  }
                />
                <Input
                  type="text"
                  name="lastName"
                  label={t("lastName")}
                  placeholder={t("lastName")}
                  variant="bordered"
                  size="sm"
                  autoComplete="family-name"
                  isInvalid={!!(formik.touched.lastName && formik.errors.lastName)}
                  errorMessage={
                    formik.touched.lastName ? formik.errors.lastName : undefined
                  }
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  endContent={
                    <User
                      size={20}
                      className="text-gray-400 pointer-events-none mr-2"
                      aria-label={t("lastName")}
                    />
                  }
                />
              </div>

              {/* Email */}
              <Input
                type="email"
                name="email"
                label={t("email")}
                placeholder={t("email")}
                variant="bordered"
                size="sm"
                autoComplete="email"
                isInvalid={!!(formik.touched.email && formik.errors.email)}
                errorMessage={
                  formik.touched.email ? formik.errors.email : undefined
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                endContent={
                  <Mail
                    size={20}
                    className="text-gray-400 pointer-events-none mr-2"
                    aria-label={t("email")}
                  />
                }
              />

              {/* Phone */}
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

              {/* Password */}
              <PasswordInput
                id="password"
                name="password"
                label={t("password")}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!(formik.touched.password && formik.errors.password)
                }
                errorMessage={
                  formik.touched.password ? formik.errors.password : undefined
                }
              />

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={formik.isSubmitting}
              >
                {t("continue")} <span className="ml-1">→</span>
              </Button>
            </form>

            <div className="flex items-center gap-3 text-gray-400 text-xs mt-4">
              <div className="h-px bg-gray-200 flex-1" />
              Or continue with
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <Button
              variant="bordered"
              className="w-full text-sm"
              startContent={<FcGoogle />}
              onPress={() => alert("Google auth integration not implemented")}
            >
              Continue with Google
            </Button>
            <Button
              variant="bordered"
              className="w-full text-sm"
              startContent={<FaMicrosoft className="text-[#0078D4]" />}
              onPress={() =>
                alert("Microsoft auth integration not implemented")
              }
            >
              Continue with Microsoft
            </Button>
          </ModalBody>

          <ModalFooter className="flex flex-col gap-2 pb-6 px-6 text-center">
            <p className="text-[11px] text-gray-400 italic leading-tight">
              AI-powered clarity for powerful teams.
            </p>
            <p className="text-[11px] text-gray-400 italic leading-tight">
              By continuing, you agree to XYVO's{" "}
              <Link href={`/${locale}/legal/conditions`} size="sm" color="primary">
                Conditions of Use
              </Link>{" "}
              and{" "}
              <Link href={`/${locale}/legal/privacy`} size="sm" color="primary">
                Privacy Notice
              </Link>
              .
            </p>
            <p className="text-xs text-gray-500">
              {t("haveAccount")}{" "}
              <Link href="#" color="primary" onClick={onClose}>
                {t("signin")}
              </Link>
            </p>
          </ModalFooter>
        </motion.div>
      </ModalContent>
    </Modal>
  );
}
