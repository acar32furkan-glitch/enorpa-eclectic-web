import { QueryClient } from "@tanstack/react-query";
import { createRouter, createRoute, rootRoute } from "@tanstack/react-router";
import { Route as __rootImport } from "./routes/__root";
import { Route as BlogRouteImport } from "./routes/blog";
import { Route as BlogIndexRouteImport } from "./routes/blog.index";
import { Route as UrunlerRouteImport } from "./routes/urunler";
import { Route as UrunlerIndexRouteImport } from "./routes/urunler.index";
import { Route as UrunlerSlugRouteImport } from "./routes/urunler.$slug";
import { Route as AdminLoginRouteImport } from "./routes/admin.login";
import { Route as AdminProtectedRouteImport } from "./routes/admin._protected";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as HakkimizdaRouteImport } from "./routes/hakkimizda";
import { Route as KvkkRouteImport } from "./routes/kvkk";
import { Route as IletisimRouteImport } from "./routes/iletisim";
import { Route as GizlilikPolitikasiRouteImport } from "./routes/gizlilik-politikasi";
import { Route as CerezPolitikasiRouteImport } from "./routes/cerez-politikasi";

const queryClient = new QueryClient();

const BlogIndexRoute = BlogIndexRouteImport.update({
  id: '/', path: '/', getParentRoute: () => BlogRoute,
} as any);

const UrunlerIndexRoute = UrunlerIndexRouteImport.update({
  id: '/', path: '/', getParentRoute: () => UrunlerRoute,
} as any);

const UrunlerSlugRoute = UrunlerSlugRouteImport.update({
  id: '/$slug', path: '/$slug', getParentRoute: () => UrunlerRoute,
} as any);

const BlogSlugRoute = {
  id: '/$slug',
  path: '/$slug',
  getParentRoute: () => BlogRoute,
  update: () => ({ id: '/$slug', path: '/$slug', getParentRoute: () => BlogRoute } as any),
};

const routeTree = __rootImport._addFileChildren({
  IndexRoute: IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => __rootImport } as any),
  BlogRoute: BlogRouteImport.update({ id: '/blog', path: '/blog', getParentRoute: () => __rootImport } as any)._addFileChildren({
    BlogSlugRoute, BlogIndexRoute,
  }),
  UrunlerRoute: UrunlerRouteImport.update({ id: '/urunler', path: '/urunler', getParentRoute: () => __rootImport } as any)._addFileChildren({
    UrunlerSlugRoute, UrunlerIndexRoute,
  }),
  HakkimizdaRoute: HakkimizdaRouteImport.update({ id: '/hakkimizda', path: '/hakkimizda', getParentRoute: () => __rootImport } as any),
  KvkkRoute: KvkkRouteImport.update({ id: '/kvkk', path: '/kvkk', getParentRoute: () => __rootImport } as any),
  IletisimRoute: IletisimRouteImport.update({ id: '/iletisim', path: '/iletisim', getParentRoute: () => __rootImport } as any),
  AdminLoginRoute: AdminLoginRouteImport.update({ id: '/admin/login', path: '/admin/login', getParentRoute: () => __rootImport } as any),
})._addFileTypes({} as any);

export const getRouter = () => createRouter({ routeTree, context: { queryClient }, scrollRestoration: true, defaultPreloadStaleTime: 0 });
