"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

// Define valid status keys
type StatusType = "Active" | "On Leave" | "Inactive";

const rows: {
  id: string;
  name: string;
  title: string;
  email: string;
  department: string;
  status: StatusType;
}[] = [
  {
    id: "#1001",
    name: "John Smith",
    title: "Senior Developer",
    email: "john.smith@example.com",
    department: "Engineering",
    status: "Active",
  },
  {
    id: "#1002",
    name: "Emily Johnson",
    title: "Product Manager",
    email: "emily.johnson@example.com",
    department: "Product",
    status: "Active",
  },
  {
    id: "#1003",
    name: "David Wilson",
    title: "UX Designer",
    email: "david.wilson@example.com",
    department: "Design",
    status: "On Leave",
  },
  {
    id: "#1004",
    name: "Sarah Brown",
    title: "Marketing Specialist",
    email: "sarah.brown@example.com",
    department: "Marketing",
    status: "Inactive",
  },
  {
    id: "#1005",
    name: "Michael Davis",
    title: "Data Analyst",
    email: "michael.davis@example.com",
    department: "Analytics",
    status: "Active",
  },
];

const statusColor: Record<StatusType, string> = {
  Active: "bg-green-100 text-green-800",
  "On Leave": "bg-yellow-100 text-yellow-800",
  Inactive: "bg-red-100 text-red-800",
};

export default function TableViewDemo() {
  return (
    <motion.div
      key="table-demo"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-auto"
    >
      <table
        className="min-w-full bg-white rounded-xl shadow-sm text-sm text-left border border-gray-200"
        aria-label="Demo Data Table"
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="px-4 py-3 font-medium text-gray-800">{row.id}</td>
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    {row.name}
                  </span>
                  <span className="text-xs text-gray-500">{row.title}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-700">{row.email}</td>
              <td className="px-4 py-3 text-gray-700">{row.department}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded ${statusColor[row.status]}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-3 flex items-center gap-3 text-gray-500">
                <button
                  className="hover:text-blue-600 transition"
                  aria-label="Edit"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  className="hover:text-red-600 transition"
                  aria-label="Delete"
                >
                  <FaTrashAlt className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
