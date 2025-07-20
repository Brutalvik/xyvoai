"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  ModalFooter,
} from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, X } from "lucide-react";

const quarters = ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024"];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (quarter: string) => void;
};

export default function MilestoneSelectorModal({
  isOpen,
  onClose,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      backdrop="blur"
      placement="top-center"
      size="md"
    >
      <ModalContent className="rounded-xl max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalHeader className="px-6 pt-6 text-center text-lg font-semibold text-default-900">
            Select a Milestone
          </ModalHeader>

          <ModalBody className="px-6 pb-0">
            <div className="grid grid-cols-2 gap-3">
              {quarters.map((q) => (
                <Button
                  key={q}
                  variant={selected === q ? "solid" : "bordered"}
                  color={selected === q ? "primary" : "default"}
                  className="w-full text-sm"
                  onPress={() => setSelected(q)}
                  endContent={selected === q ? <CheckCircle size={16} /> : null}
                >
                  {q}
                </Button>
              ))}
            </div>
          </ModalBody>

          <ModalFooter className="flex flex-col gap-2 px-6 pb-6">
            <Button
              color="primary"
              className="w-full"
              onPress={handleSelect}
              isDisabled={!selected}
            >
              Confirm
            </Button>
            <Button
              variant="light"
              className="w-full text-gray-500 text-xs"
              onPress={onClose}
              startContent={<X size={16} />}
            >
              Cancel
            </Button>
          </ModalFooter>
        </motion.div>
      </ModalContent>
    </Modal>
  );
}
