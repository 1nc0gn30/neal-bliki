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
const Jamstack = lazy(() => import("./pages/Jamstack"));
const Builds = lazy(() => import("./pages/Builds"));
const AIIndex = lazy(() => import("./pages/AIIndex"));
const SocialFeed = lazy(() => import("./pages/SocialFeed"));
const LocationsHub = lazy(() => import("./pages/LocationsHub"));
const CityLandingPage = lazy(() => import("./pages/CityLandingPage"));
const PortfolioShowcase = lazy(() => import("./pages/PortfolioShowcase"));
const ProjectEstimator = lazy(() => import("./pages/ProjectEstimator"));
const ProcessPage = lazy(() => import("./pages/ProcessPage"));
const KnowledgeGraph = lazy(() => import("./pages/KnowledgeGraph"));
const SEOAuditTool = lazy(() => import("./pages/SEOAuditTool"));
const PixelPetsPlayground = lazy(() => import("./pages/PixelPetsPlayground"));
const PixelPetsDocs = lazy(() => import("./pages/PixelPetsDocs"));
const AITechStackHub = lazy(() => import("./pages/AITechStackHub"));

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
            <Route path="jamstack" element={<Jamstack />} />
            <Route path="builds" element={<Builds />} />
            <Route path="ai" element={<AIIndex />} />
            <Route path="social" element={<SocialFeed />} />
            <Route path="locations" element={<LocationsHub />} />
            <Route path="locations/:cityId" element={<CityLandingPage />} />
            <Route path="portfolio" element={<PortfolioShowcase />} />
            <Route path="calculator" element={<ProjectEstimator />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="graph" element={<KnowledgeGraph />} />
            <Route path="audit" element={<SEOAuditTool />} />
            <Route path="pets" element={<PixelPetsPlayground />} />
            <Route path="pets/docs" element={<PixelPetsDocs />} />
            <Route path="ai-tech-stack" element={<AITechStackHub />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
