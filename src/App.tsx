import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import ServiceDetailPage from "./pages/ServiceDetailPage.tsx";
import ProcessPage from "./pages/ProcessPage.tsx";
import NotarizationProcessPage from "./pages/process/NotarizationProcessPage.tsx";
import LegalizationProcessPage from "./pages/process/LegalizationProcessPage.tsx";
import TranslationProcessPage from "./pages/process/TranslationProcessPage.tsx";
import LegalDraftingProcessPage from "./pages/process/LegalDraftingProcessPage.tsx";
import ApostilleProcessPage from "./pages/process/ApostilleProcessPage.tsx";
import InsightsPage from "./pages/InsightsPage.tsx";
import InsightDetailPage from "./pages/InsightDetailPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import RequestPage from "./pages/RequestPage.tsx";
import CareersPage from "./pages/CareersPage.tsx";
import TeamMemberPage from "./pages/TeamMemberPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import TmuPage from "./pages/TmuPage.tsx";
import AnnouncementBar from "./components/site/AnnouncementBar.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import RequireAdmin from "./components/admin/RequireAdmin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import InsightsAdmin from "./pages/admin/InsightsAdmin.tsx";
import TeamAdmin from "./pages/admin/TeamAdmin.tsx";
import JobsAdmin from "./pages/admin/JobsAdmin.tsx";
import PartnersAdmin from "./pages/admin/PartnersAdmin.tsx";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin.tsx";
import RouteTranslationSync from "./components/site/RouteTranslationSync.tsx";
import AssistantAdmin from "./pages/admin/AssistantAdmin.tsx";
import LeadsAdmin from "./pages/admin/LeadsAdmin.tsx";
import BAAssistant from "./components/site/BAAssistant.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <RouteTranslationSync />
          <AnnouncementBar />
          <BAAssistant />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/translation" element={<ServiceDetailPage i18nKey="translation" />} />
            <Route path="/notarization" element={<ServiceDetailPage i18nKey="notarization" />} />
            <Route path="/legalization" element={<ServiceDetailPage i18nKey="legalization" />} />
            <Route path="/apostille" element={<ServiceDetailPage i18nKey="apostille" />} />
            <Route path="/legal-drafting" element={<ServiceDetailPage i18nKey="legalDrafting" />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/process/notarization" element={<NotarizationProcessPage />} />
            <Route path="/process/legalization" element={<LegalizationProcessPage />} />
            <Route path="/process/translation" element={<TranslationProcessPage />} />
            <Route path="/process/legal-drafting" element={<LegalDraftingProcessPage />} />
            <Route path="/process/apostille" element={<ApostilleProcessPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/team/:slug" element={<TeamMemberPage />} />
            <Route path="/tmu" element={<TmuPage />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
              <Route index element={<AdminDashboard />} />
              <Route path="insights" element={<InsightsAdmin />} />
              <Route path="team" element={<TeamAdmin />} />
              <Route path="jobs" element={<JobsAdmin />} />
              <Route path="partners" element={<PartnersAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="assistant" element={<AssistantAdmin />} />
              <Route path="leads" element={<LeadsAdmin />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
