import { Outlet, createFileRoute, useChildMatches } from "@tanstack/react-router";
import { ProjectsList } from "@/components/ProjectsList";

function PortfolioLayout() {
  const children = useChildMatches();
  return children.length > 0 ? <Outlet /> : <ProjectsList lang="TR" />;
}

export const Route = createFileRoute("/portfolio")({
  component: PortfolioLayout,
});
