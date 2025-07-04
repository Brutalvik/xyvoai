"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from "@heroui/react";
import { HiCheckCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import clsx from "clsx";
import { individualPlans } from "@/plans/individualPlans";

interface PlanSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

export default function PlanSelector({
  selected,
  onSelect,
  onContinue,
}: PlanSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-10 px-4 sm:px-8 bg-white dark:bg-black"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Choose Your Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {individualPlans.map((plan) => (
          <Card
            key={plan.id}
            className={clsx(
              "transition-all border shadow-lg hover:shadow-xl cursor-pointer",
              selected === plan.id
                ? "border-primary ring-2 ring-primary"
                : "border-gray-200 dark:border-gray-700"
            )}
            onClick={() => onSelect(plan.id)}
          >
            <CardHeader className="pb-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {plan.description}
              </p>
            </CardHeader>

            <CardBody className="space-y-3">
              <div className="text-2xl font-bold text-primary">
                {plan.price}
              </div>
              <ul className="space-y-2">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <HiCheckCircle className="text-success w-4 h-4" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.highlight && (
                <Chip size="sm" color="warning">
                  {plan.highlight}
                </Chip>
              )}
              <Chip
                size="sm"
                color={plan.audience === "individual" ? "primary" : "secondary"}
                className="mt-2"
              >
                {plan.audience === "individual" ? "Individual" : "Team"}
              </Chip>
            </CardBody>

            <CardFooter className="pt-4">
              <Button
                variant={selected === plan.id ? "solid" : "bordered"}
                color="primary"
                className="w-full"
                onPress={() => onSelect(plan.id)}
              >
                {selected === plan.id ? "Selected" : "Choose Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onPress={onContinue}
          isDisabled={!selected}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
