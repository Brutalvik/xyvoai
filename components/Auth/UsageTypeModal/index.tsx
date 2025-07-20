"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Link,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/icons";
import { FaUser, FaUsers, FaChevronRight } from "react-icons/fa";

export type UsageType = "personal" | "team";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (usageType: UsageType) => void;
}

export function UsageTypeModal({ isOpen, onClose, onContinue }: Props) {
  const t = useTranslations("signup");
  const [usageType, setUsageType] = React.useState<UsageType | "">("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<UsageType | null>(
    null
  );

  const handleContinue = () => {
    if (!usageType) return;
    setIsSubmitting(true);
    onContinue(usageType);
  };

  const handleCardSelect = (type: UsageType) => {
    setUsageType(type);
    setSelectedCard(type);
  };

  const handleCloseModal = () => {
    // Reset state when modal is closed
    setUsageType("");
    setSelectedCard(null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseModal();
      }}
      placement="top-center"
      backdrop="blur"
      size="lg"
      className="max-w-2xl"
    >
      <ModalContent className="overflow-y-auto max-h-[90vh] rounded-xl w-full mx-4 hide-scrollbar">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="p-6 pb-4">
              <div className="flex justify-center mb-5">
                <Logo className="h-8 w-auto" />
              </div>

              <ModalBody className="p-0">
                <div className="text-center mb-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">
                    {t("usageType.heading")}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("usageType.subheading")}
                  </p>
                </div>

                <div className="space-y-3 mb-5">
                  {["personal", "team"].map((type) => {
                    const isSelected = selectedCard === type;
                    return (
                      <motion.div
                        key={type}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        className={`relative cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                          isSelected
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                        }`}
                        onClick={() => handleCardSelect(type as UsageType)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-lg ${
                              isSelected
                                ? "bg-primary-100 text-primary-600 dark:bg-primary-800/30 dark:text-primary-400"
                                : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {type === "personal" ? (
                              <FaUser className="h-4 w-4" />
                            ) : (
                              <FaUsers className="h-4 w-4" />
                            )}
                          </div>
                          <div className="ml-3 text-left flex-1 min-w-0">
                            <h3
                              className={`text-sm font-medium truncate ${
                                isSelected
                                  ? "text-primary-900 dark:text-primary-100"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {t(`usageType.${type}.title`)}
                            </h3>
                            <p
                              className={`text-xs ${
                                isSelected
                                  ? "text-primary-700 dark:text-primary-300"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {t(`usageType.${type}.description`)}
                            </p>
                          </div>
                          <div
                            className={`transition-transform duration-200 ${isSelected ? "scale-100" : "scale-0"}`}
                          >
                            <div className="h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center">
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="text-center">
                  <p
                    className="text-xs text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: t.raw("usageType.note"),
                    }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName === "A") {
                        e.preventDefault();
                        // Handle learn more action
                      }
                    }}
                  />
                </div>
              </ModalBody>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-100 dark:border-gray-700/50">
              <div className="flex flex-col space-y-2">
                <Button
                  color="primary"
                  className="w-full justify-center text-sm h-10 group"
                  onPress={handleContinue}
                  isDisabled={!usageType}
                  isLoading={isSubmitting}
                  endContent={
                    !isSubmitting && (
                      <FaChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    )
                  }
                >
                  {t("usageType.continue")}
                </Button>
                <Button
                  variant="light"
                  className="w-full justify-center text-sm h-10"
                  onPress={onClose}
                >
                  {t("usageType.back")}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </ModalContent>
    </Modal>
  );
}
