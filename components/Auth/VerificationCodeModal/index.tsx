"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Modal, ModalContent, Button, InputOtp } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Logo } from "@/components/icons";
import { HiArrowLeft, HiRefresh } from "react-icons/hi";

interface VerificationCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  email: string;
  onResendCode?: () => Promise<void>;
  title?: string;
  description?: string;
}

interface FormValues {
  code: string;
}

export function VerificationCodeModal({
  isOpen,
  onClose,
  onVerify,
  email,
  onResendCode,
  title,
  description,
}: VerificationCodeModalProps) {
  const t = useTranslations("auth.verification");
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required(t("validation.required"))
      .length(6, t("validation.invalidCode")),
  });

  const initialValues: FormValues = {
    code: "",
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      setError(null);
      await onVerify(values.code);
      resetForm();
    } catch (err: any) {
      setError(err.message || t("errorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!onResendCode) return;

    try {
      setIsResending(true);
      await onResendCode();
    } catch (err: any) {
      setError(err.message || t("resendErrorMessage"));
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    const getCode = async () => {
      if (isOpen) {
        setError(null);
        await onResendCode?.();
      }
    };
    getCode();
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
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
              <Logo className="h-6 w-6 text-white" />
              <h1 className="text-white font-bold text-sm sm:text-base tracking-wide">
                YVO
              </h1>
            </div>
            <h2 className="text-white text-lg font-semibold mt-2">
              {title || t("title")}
            </h2>
            <p className="text-gray-200 text-sm mt-1">
              {description || t("description", { email })}
            </p>
          </div>

          <div className="p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <InputOtp
                      value={values.code}
                      onValueChange={(val) => setFieldValue("code", val)}
                      length={6}
                      autoFocus
                      classNames={{
                        base: "justify-center",
                        input: "text-2xl font-semibold text-center",
                        segmentWrapper: "flex flex-row justify-center",
                        segment: "h-12 w-12 mx-1",
                      }}
                      isInvalid={!!(errors.code && touched.code)}
                      errorMessage={touched.code ? errors.code : undefined}
                    />

                    {error && (
                      <p className="text-sm text-danger-500 text-center">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-3">
                    <Button
                      type="submit"
                      color="primary"
                      className="w-full"
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                    >
                      {t("verifyButton")}
                    </Button>

                    {onResendCode && (
                      <Button
                        type="button"
                        variant="flat"
                        color="default"
                        className="w-full"
                        onPress={handleResendCode}
                        isDisabled={isResending}
                        startContent={
                          isResending ? (
                            <HiRefresh className="animate-spin" />
                          ) : (
                            <HiRefresh />
                          )
                        }
                      >
                        {t("resendButton")}
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="light"
                      className="w-full"
                      onPress={handleClose}
                      startContent={<HiArrowLeft />}
                    >
                      {t("backButton")}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </ModalContent>
    </Modal>
  );
}

export default VerificationCodeModal;
