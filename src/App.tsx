import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { PageTransition } from "@/components/layout/PageTransition";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBookingBar } from "@/components/layout/StickyBookingBar";
import Home from "@/pages/Home";

const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const BookPage = lazy(() => import("@/pages/BookPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname}>
        <Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-olive focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <ScrollManager />
        <Header />
        <main id="main">
          <Pages />
        </main>
        <Footer />
        <StickyBookingBar />
      </SmoothScroll>
    </BrowserRouter>
  );
}
