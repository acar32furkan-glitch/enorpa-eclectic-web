import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_protected/")({
  ssr: false,
  beforeLoad: () => {
    throw redirect({ to: "/admin/dashboard" });
  },
});
