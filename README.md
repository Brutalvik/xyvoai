# 🚀 Xyvo AI – AI-Native Project Management Platform

**Xyvo** is a fully AI-powered project execution platform designed to eliminate overhead, automate clarity, and supercharge teams. Built with Next.js 14, HeroUI, and OpenAI — it’s project management, reimagined for the AI era.

---

## ✨ Features

- 🧠 GPT-powered task generation, rephrasing, and next-step insights
- 🎙️ Whisper voice-to-task input
- 🗂️ GitHub-style Kanban with drag-and-drop
- 🔍 AI vector search (Pinecone/Weaviate)
- 🌐 English + French i18n support
- 🔒 Org-based roles (Admin, PM, Member) via Clerk/Auth0
- 🎨 Beautiful UI with HeroUI, Tailwind, Framer Motion

---

## 🧱 Built With

| Layer    | Stack                                                                           |
| -------- | ------------------------------------------------------------------------------- |
| Frontend | **Next.js 14 (App Router)**, **HeroUI v2**, **Tailwind CSS**, **Framer Motion** |
| Backend  | **Fastify**, **Prisma**, **PostgreSQL**, optional **Redis**                     |
| AI       | **OpenAI GPT-4o**, **Whisper**, **Pinecone** / **Weaviate**                     |
| Auth     | **Clerk** / **Auth0**                                                           |
| Infra    | **AWS ECS/Fargate**, **S3**, **RDS**, **Route 53**, **CloudFront**              |
| Extras   | **PostHog**, **TypeScript**, **next-themes**                                    |

---

## 🌟 Try It Live

Explore the Xyvo AI project on GitHub:  
🔗 [github.com/Brutalvik/xyvoai](https://github.com/Brutalvik/xyvoai)

You can clone it, contribute, or deploy directly to AWS (S3 + CloudFront for frontend, ECS for backend).  
Frontend supports full dark/light theming and multilingual UX. Backend is Fastify + Prisma.

---

## 🧑‍💻 Getting Started – Xyvo AI

### 1. Clone the Repository

```bash
git clone https://github.com/Brutalvik/xyvoai.git
cd xyvoai

```
