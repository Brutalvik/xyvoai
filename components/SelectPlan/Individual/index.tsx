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
import { useState } from "react";

import { individualPlans } from "@/plans/individualPlans";

interface PlanSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
  submitting: boolean;
}

export default function PlanSelector({
  selected,
  onSelect,
  onContinue,
  submitting,
}: PlanSelectorProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen py-5 px-4 sm:px-8"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-center text-default-800 dark:text-white mb-10">
        Choose Your Plan
      </h1>

      <div className="flex justify-center mb-6 gap-4">
        <Button
          color="primary"
          variant={billingCycle === "monthly" ? "solid" : "ghost"}
          onPress={() => setBillingCycle("monthly")}
        >
          Monthly
        </Button>
        <Button
          color="primary"
          variant={billingCycle === "yearly" ? "solid" : "ghost"}
          onPress={() => setBillingCycle("yearly")}
        >
          Yearly
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 xl:gap-8 max-w-full mx-auto">
        {individualPlans.map((plan) => (
          <Card
            key={plan.id}
            className={clsx(
              "flex flex-col w-full sm:w-[300px] max-w-full min-h-[420px] transition-all border shadow-lg hover:shadow-xl cursor-pointer",
              selected === plan.id
                ? "border-primary ring-2 ring-primary"
                : "border-gray-200 dark:border-gray-700",
            )}
            onClick={() => onSelect(plan.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-default-900 dark:text-white">
                  {plan.name}
                </h2>
                <p className="text-sm text-default-500 dark:text-default-400 mt-1">
                  {plan.description}
                </p>
                {billingCycle === "yearly" &&
                  plan.id !== "free" &&
                  plan.id !== "solo_plus" && (
                    <Chip color="success" size="sm">
                      Save 15%
                    </Chip>
                  )}
              </div>
            </CardHeader>

            <CardBody className="space-y-3 flex-grow">
              <div className="text-2xl font-bold text-primary">
                {plan.prices[billingCycle]}
              </div>
              <ul className="space-y-2">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-default-600 dark:text-default-300"
                  >
                    <HiCheckCircle className="text-success w-4 h-4" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.highlight && (
                <Chip color="warning" size="sm">
                  {plan.highlight}
                </Chip>
              )}
              <Chip
                className="mt-2"
                color={plan.audience === "individual" ? "primary" : "secondary"}
                size="sm"
              >
                {plan.audience === "individual" ? "Individual" : "Team"}
              </Chip>
            </CardBody>

            <CardFooter className="pt-4">
              <Button
                className="w-full"
                color="primary"
                variant={selected === plan.id ? "solid" : "bordered"}
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
          color="primary"
          isDisabled={!selected}
          isLoading={submitting}
          size="lg"
          variant="solid"
          onPress={onContinue}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
