import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ru/blog")({
  component: () => <Outlet />,
});
