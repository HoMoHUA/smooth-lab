/* Style reminder: میدان آرام — تجربهٔ تک‌صفحه‌ای با حرکت و تمرکز بر تعامل، نه ناوبری پیچیده. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LabsStudy from "./pages/LabsStudy";
import { Route, Switch } from "wouter";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Switch>
            <Route path="/labs-study" component={LabsStudy} />
            <Route component={Home} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
