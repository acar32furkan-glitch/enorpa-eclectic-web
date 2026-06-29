import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Factory, Globe, Users } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/en")({
  component: () => <Outlet />,
});
