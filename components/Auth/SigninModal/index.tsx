"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Link,
  Checkbox,
} from "@heroui/react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/store/hooks";
import { signInThunk } from "@/store/auth/thunks";
import { setUser } from "@/store/slices/userSlice";
import { PasswordInput } from "@/components/ui/Auth/PasswordInput";
import { Logo } from "@/components/icons";
import { HiBan, HiBadgeCheck } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa6";
import { addToast } from "@heroui/react";
import { Mail } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect: () => void;
  onSignupClick?: () => void;
  onForgotPasswordClick?: () => void; 
};

export default function SigninModal({
  isOpen,
  onClose,
  onSuccessRedirect,
  onSignupClick,
  onForgotPasswordClick,
}: Props) {
  const dispatch = useAppDispatch();
  const t = useTranslations("Signin");
  const v = useTranslations("SigninValidation");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(v("invalidEmail")).required(v("required")),
      password: Yup.string().required(v("required")),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { user } = await dispatch(signInThunk(values)).unwrap();
        dispatch(setUser(user));
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
            <p className="text-white text-sm">{t("subtitle")}</p>
          </div>

          {/* Form */}
          <ModalBody className="flex flex-col gap-4 py-6 px-6">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <Checkbox
                  size="sm"
                  classNames={{ label: "text-xs text-gray-600" }}
                >
                  {t("remember")}
                </Checkbox>
                 <Link
                  href="#"
                  size="sm"
                  color="primary"
                  className="text-[11px]"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onForgotPasswordClick?.(); 
                  }}
                >
                  {t("forgot")}
                </Link>
              </div>
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={formik.isSubmitting}
              >
                {t("signin")} <span className="ml-1">→</span>
              </Button>
            </form>

            <div className="flex items-center gap-3 text-gray-400 text-[11px] mt-4">
              <div className="h-px bg-gray-200 flex-1" />
              {t("continueWith")}
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <Button
              variant="bordered"
              className="w-full text-sm"
              startContent={<FcGoogle />}
              onPress={() => alert("Google auth integration not implemented")}
            >
              {t("google")}
            </Button>
            <Button
              variant="bordered"
              className="w-full text-sm"
              startContent={<FaMicrosoft className="text-[#0078D4]" />}
              onPress={() =>
                alert("Microsoft auth integration not implemented")
              }
            >
              {t("microsoft")}
            </Button>
          </ModalBody>

          <ModalFooter className="flex flex-col gap-2 pb-6 px-6 text-center">
            <p className="text-[11px] text-gray-400 italic leading-tight">
              {t("quote")}
            </p>
            <p className="text-[11px] text-gray-500">
              {t("noAccount")}{" "}
              <Link
                href="#"
                color="primary"
                className="text-[11px]"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  onSignupClick?.();
                }}
              >
                {t("signup")}
              </Link>
            </p>
          </ModalFooter>
        </motion.div>
      </ModalContent>
    </Modal>
  );
}
