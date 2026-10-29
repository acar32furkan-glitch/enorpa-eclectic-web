import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

/**
 * Rota ağacı `src/routeTree.gen.ts` dosyasından gelir (TanStack Router dosya
 * tabanlı üretim). Daha önce burada elle tutulan ağaç, yeni eklenen sayfaların
 * (ör. /en/referanslar, /blog/$slug) 404 vermesine yol açıyordu.
 */
export const getRouter = () =>
  createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
