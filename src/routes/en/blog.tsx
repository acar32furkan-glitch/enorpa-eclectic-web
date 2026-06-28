import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/en/blog")({
  component: () => <Outlet />,
});
