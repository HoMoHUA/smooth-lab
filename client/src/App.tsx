/* Style reminder: میدان آرام — تجربهٔ تک‌صفحه‌ای با حرکت و تمرکز بر تعامل، نه ناوبری پیچیده. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LabsStudy from "./pages/LabsStudy";
import { Route, Switch } from "wouter";
import { MotionConfig } from "framer-motion";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        {/* Framer Motion follows the OS "reduce motion" setting: transforms are skipped, opacity still fades. */}
        <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <Switch>
            <Route path="/labs-study" component={LabsStudy} />
            <Route component={Home} />
          </Switch>
          <Toaster />
        </TooltipProvider>
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
