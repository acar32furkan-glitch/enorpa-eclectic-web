import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { Route as __rootImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as HakkimizdaRouteImport } from "./routes/hakkimizda";
import { Route as KvkkRouteImport } from "./routes/kvkk";
import { Route as IletisimRouteImport } from "./routes/iletisim";
import { Route as AdminLoginRouteImport } from "./routes/admin.login";
import { Route as UrunlerRouteImport } from "./routes/urunler";
import { Route as UrunlerSlugRouteImport } from "./routes/urunler.$slug";
import { Route as UrunlerIndexRouteImport } from "./routes/urunler.index";
import { Route as BlogRouteImport } from "./routes/blog";
import { Route as BlogIndexRouteImport } from "./routes/blog.index";
import { Route as BlogSlugRouteImport } from "./routes/blog.$slug";

const queryClient = new QueryClient();

const routeTree = __rootImport._addFileChildren({
  IndexRoute: IndexRouteImport.update({ getId: () => '/', path: '/', getParentRoute: () => __rootImport } as any),
  HakkimizdaRoute: HakkimizdaRouteImport.update({ getId: () => '/hakkimizda', path: '/hakkimizda', getParentRoute: () => __rootImport } as any),
  KvkkRoute: KvkkRouteImport.update({ getId: () => '/kvkk', path: '/kvkk', getParentRoute: () => __rootImport } as any),
  IletisimRoute: IletisimRouteImport.update({ getId: () => '/iletisim', path: '/iletisim', getParentRoute: () => __rootImport } as any),
  AdminLoginRoute: AdminLoginRouteImport.update({ getId: () => '/admin/login', path: '/admin/login', getParentRoute: () => __rootImport } as any),
  BlogRoute: BlogRouteImport.update({ getId: () => '/blog', path: '/blog', getParentRoute: () => __rootImport } as any)._addFileChildren({
    BlogIndexRoute: BlogIndexRouteImport.update({ getId: () => '/', path: '/', getParentRoute: () => BlogRouteImport } as any),
    BlogSlugRoute: BlogSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => BlogRouteImport } as any),
  } as any),
  UrunlerRoute: UrunlerRouteImport.update({ getId: () => '/urunler', path: '/urunler', getParentRoute: () => __rootImport } as any)._addFileChildren({
    UrunlerSlugRoute: UrunlerSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => UrunlerRouteImport } as any),
    UrunlerIndexRoute: UrunlerIndexRouteImport.update({ getId: () => '/', path: '/', getParentRoute: () => UrunlerRouteImport } as any),
  } as any),
} as any)._addFileTypes({} as any);

export const getRouter = () => createRouter({ routeTree, context: { queryClient }, scrollRestoration: true, defaultPreloadStaleTime: 0 });