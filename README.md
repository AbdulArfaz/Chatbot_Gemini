# CHATBOT GEMINI

A modern full-stack AI chatbot application powered by Google Gemini, designed to deliver fast, intelligent, and responsive conversational experiences.

# Live Link
* *Live Application:* https://chatbot-gemini-client-two.vercel.app

## Overview
A comprehensive full-stack multi-package web application built to integrate Google's advanced Gemini AI capabilities seamlessly into a responsive user interface with a secure backend.

## Features

* *AI Chat Interface:* Real-time conversational streaming and prompt handling.
* *Frontend Client:* User-friendly, modern interface styled with Tailwind CSS.
* *Backend API:* Robust Node.js & Express server handling secure API communication with Google GenAI.

##  Tech Stack & Libraries

* *Frontend:*
  * React, Vite
  * Tailwind CSS, Lucide React (Icons)
  * React Hook Form, Axios
* *Backend & Security:*
  * Node.js, Express
  * Google GenAI SDK (@google/genai)
  * Dotenv, Zod

##  Deployment & Infrastructure

* *Frontend Client:* Deployed and hosted with continuous integration from GitHub.
* *Backend API:* Hosted as a web service integrated with the Gemini API.

##  Project Structure

```text
Chatbot_Gemini/
├── packages/
│   ├── client/       # React frontend application
│   └── server/       # Node.js/Express backend API & Gemini integration
