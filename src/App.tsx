/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const WikiList = lazy(() => import("./pages/WikiList"));
const WikiNode = lazy(() => import("./pages/WikiNode"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Offerings = lazy(() => import("./pages/Offerings"));
const Contact = lazy(() => import("./pages/Contact"));
const NetlifyPage = lazy(() => import("./pages/Netlify"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen bg-white px-6 pt-32 text-center text-[#4b5563]">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="wiki" element={<WikiList />} />
            <Route path="wiki/:id" element={<WikiNode />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="offerings" element={<Offerings />} />
            <Route path="contact" element={<Contact />} />
            <Route path="netlify" element={<NetlifyPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
