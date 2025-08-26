"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal, ModalContent, ModalBody, Button, Input } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { PasswordInput } from "@/components/ui/Auth/PasswordInput";
import { Logo } from "@/components/icons";
import VerificationCodeModal from "@/components/Auth/VerificationCodeModal";
import { useAppDispatch } from "@/store/hooks";
import { requestPasswordResetCodeThunk, resetPasswordThunk } from "@/store/auth/thunks";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect?: () => void;
}

interface RequestCodeValues {
  email: string;
}

interface ResetPasswordValues {
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordModal({ isOpen, onClose, onSuccessRedirect }: ForgotPasswordModalProps) {
  const t = useTranslations("ForgotPassword");
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<"request" | "verify" | "reset">("request");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [CodeMismatchException, setCodeMismatchException] = useState<boolean>(false);

  // Step 1: Request code
  const requestCodeSchema = Yup.object({
    email: Yup.string().email(t("invalidEmail")).required(t("required")),
  });

  const handleRequestCode = async (values: RequestCodeValues, actions: FormikHelpers<RequestCodeValues>) => {
    console.log("Requesting password reset code for:", values.email);
    try {
      const result = await dispatch(requestPasswordResetCodeThunk({ email: values.email })).unwrap();
      console.log("Dispatch result:", result);
      setEmail(values.email);
      setStep("verify");
    } catch (err: any) {
      actions.setFieldError("email", err || t("requestError"));
    } finally {
      actions.setSubmitting(false);
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async (code: string) => {
    try {
      setVerificationCode(code);
      setStep("reset");
    } catch (err: any) {
      throw new Error(err.message || t("verifyError"));
    }
  };

  const handleResendCode = async () => {
    try {
      await dispatch(requestPasswordResetCodeThunk({ email })).unwrap();
    } catch (err: any) {
      console.log("ERROR OCCURED")
      throw new Error(err || t("resendError"));
    }
  };

  // Step 3: Reset password
  const resetPasswordSchema = Yup.object({
    newPassword: Yup.string().min(6, t("passwordMin")).required(t("required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("passwordMismatch"))
      .required(t("required")),
  });

const handleResetPassword = async (values: ResetPasswordValues, actions: FormikHelpers<ResetPasswordValues>) => {
  try {
    await dispatch(
      resetPasswordThunk({ email, code: verificationCode, newPassword: values.newPassword })
    ).unwrap();

    actions.resetForm();
    onClose();
    onSuccessRedirect?.();
  } catch (err: any) {
    const errorMessage = err?.toString() || t("resetError");

    // ✅ Check for invalid or expired code
    if (
      errorMessage.includes("CodeMismatchException") ||
      errorMessage.includes("ExpiredCodeException") ||
      errorMessage.includes("Invalid code")
    ) {
      setStep("verify");
      setCodeMismatchException(true);
      setVerificationCode(""); // clear previous invalid code
      return;
    }

    actions.setFieldError("newPassword", errorMessage);
  } finally {
    actions.setSubmitting(false);
  }
};


  const handleModalClose = () => {
    setStep("request");
    setEmail("");
    setVerificationCode("");
    onClose();
  };

  return (
    <>
      {/* Step 1: Request Code */}
      {step === "request" && (
        <Modal
          isOpen={isOpen}
          onOpenChange={(open) => {
            if (!open) handleModalClose();
          }}
          placement="top-center"
          backdrop="blur"
          size="sm"
        >
          <ModalContent className="overflow-hidden rounded-xl">
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="bg-gradient-to-br from-[#080f17] to-[#2c7ad4] py-6 px-4 text-center">
                <div className="flex justify-center items-center gap-2">
                  <Logo className="h-6 w-6 text-white" />
                  <h1 className="text-white font-bold text-sm sm:text-base tracking-wide">YVO</h1>
                </div>
                <h2 className="text-white text-lg font-semibold mt-2">{t("requestTitle")}</h2>
                <p className="text-gray-200 text-sm mt-1">{t("requestDescription")}</p>
              </div>

              <ModalBody className="p-6">
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={requestCodeSchema}
                  onSubmit={handleRequestCode}
                >
                  {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                    <Form className="space-y-4">
                      <Input
                        type="email"
                        name="email"
                        label={t("email")}
                        placeholder={t("email")}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!(errors.email && touched.email)}
                        errorMessage={touched.email ? errors.email : undefined}
                        required
                      />
                      <Button type="submit" color="primary" className="w-full" isLoading={isSubmitting}>
                        {t("requestButton")}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </motion.div>
          </ModalContent>
        </Modal>
      )}

      {/* Step 2: Verify Code */}
      {step === "verify" && (
        <VerificationCodeModal
          isOpen={isOpen}
          onClose={handleModalClose}
          email={email}
          onVerify={handleVerifyCode}
          onResendCode={handleResendCode}
          codeError={CodeMismatchException}
        />
      )}

      {/* Step 3: Reset Password */}
      {step === "reset" && (
        <Modal
          isOpen={isOpen}
          onOpenChange={(open) => {
            if (!open) handleModalClose();
          }}
          placement="top-center"
          backdrop="blur"
          size="sm"
        >
          <ModalContent className="overflow-hidden rounded-xl">
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="bg-gradient-to-br from-[#080f17] to-[#2c7ad4] py-6 px-4 text-center">
                <div className="flex justify-center items-center gap-2">
                  <Logo className="h-6 w-6 text-white" />
                  <h1 className="text-white font-bold text-sm sm:text-base tracking-wide">YVO</h1>
                </div>
                <h2 className="text-white text-lg font-semibold mt-2">{t("resetTitle")}</h2>
                <p className="text-gray-200 text-sm mt-1">{t("resetDescription", { email })}</p>
              </div>

              <ModalBody className="p-6">
                <Formik
                  initialValues={{ newPassword: "", confirmPassword: "" }}
                  validationSchema={resetPasswordSchema}
                  onSubmit={handleResetPassword}
                >
                  {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                    <Form className="space-y-4">
                      <PasswordInput
                        id="newPassword"
                        name="newPassword"
                        label={t("newPassword")}
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!(errors.newPassword && touched.newPassword)}
                        errorMessage={touched.newPassword ? errors.newPassword : undefined}
                      />
                      <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label={t("confirmPassword")}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!(errors.confirmPassword && touched.confirmPassword)}
                        errorMessage={touched.confirmPassword ? errors.confirmPassword : undefined}
                      />
                      <Button type="submit" color="primary" className="w-full" isLoading={isSubmitting}>
                        {t("resetButton")}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </motion.div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
