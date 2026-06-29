import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { Route as __rootImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as HakkimizdaRouteImport } from "./routes/hakkimizda";
import { Route as KvkkRouteImport } from "./routes/kvkk";
import { Route as IletisimRouteImport } from "./routes/iletisim";
import { Route as AdminLoginRouteImport } from "./routes/admin.login";
import { Route as AdminProtectedRouteImport } from "./routes/admin._protected";
import { Route as AdminDashboardRouteImport } from "./routes/admin._protected.dashboard";
import { Route as AdminLeadsRouteImport } from "./routes/admin._protected.leads";
import { Route as AdminProductsRouteImport } from "./routes/admin._protected.products";
import { Route as AdminSettingsRouteImport } from "./routes/admin._protected.settings";
import { Route as UrunlerRouteImport } from "./routes/urunler";
import { Route as UrunlerSlugRouteImport } from "./routes/urunler.$slug";
import { Route as UrunlerIndexRouteImport } from "./routes/urunler.index";
import { Route as BlogRouteImport } from "./routes/blog";
import { Route as BlogIndexRouteImport } from "./routes/blog.index";
import { Route as BlogSlugRouteImport } from "./routes/blog.$slug";
import { Route as ProjelerRouteImport } from "./routes/projeler";
import { Route as PortfolioRouteImport } from "./routes/portfolio";
import { Route as PortfolioSlugRouteImport } from "./routes/portfolio.$slug";
import { Route as ReferanslarRouteImport } from "./routes/referanslar";
import { Route as GizlilikPolitikasiRouteImport } from "./routes/gizlilik-politikasi";
import { Route as CerezPolitikasiRouteImport } from "./routes/cerez-politikasi";
import { Route as SssRouteImport } from "./routes/sss";
import { Route as EnRouteImport } from "./routes/en";
import { Route as EnAboutRouteImport } from "./routes/en/about";
import { Route as EnProductsRouteImport } from "./routes/en/products";
import { Route as EnProductsSlugRouteImport } from "./routes/en/products.$slug";
import { Route as EnContactRouteImport } from "./routes/en/contact";
import { Route as EnBlogRouteImport } from "./routes/en/blog";
import { Route as EnBlogSlugRouteImport } from "./routes/en/blog.$slug";
import { Route as EnPortfolioRouteImport } from "./routes/en/portfolio";
import { Route as EnPortfolioSlugRouteImport } from "./routes/en/portfolio.$slug";
import { Route as RuRouteImport } from "./routes/ru";
import { Route as RuAboutRouteImport } from "./routes/ru/about";
import { Route as RuProductsRouteImport } from "./routes/ru/products";
import { Route as RuProductsSlugRouteImport } from "./routes/ru/products.$slug";
import { Route as RuContactRouteImport } from "./routes/ru/contact";
import { Route as RuBlogRouteImport } from "./routes/ru/blog";
import { Route as RuBlogSlugRouteImport } from "./routes/ru/blog.$slug";
import { Route as RuPortfolioRouteImport } from "./routes/ru/portfolio";
import { Route as RuPortfolioSlugRouteImport } from "./routes/ru/portfolio.$slug";

const queryClient = new QueryClient();

const routeTree = __rootImport._addFileChildren({
  IndexRoute: IndexRouteImport.update({ getId: () => '/', path: '/', getParentRoute: () => __rootImport } as any),
  HakkimizdaRoute: HakkimizdaRouteImport.update({ getId: () => '/hakkimizda', path: '/hakkimizda', getParentRoute: () => __rootImport } as any),
  KvkkRoute: KvkkRouteImport.update({ getId: () => '/kvkk', path: '/kvkk', getParentRoute: () => __rootImport } as any),
  IletisimRoute: IletisimRouteImport.update({ getId: () => '/iletisim', path: '/iletisim', getParentRoute: () => __rootImport } as any),
  ProjelerRoute: ProjelerRouteImport.update({ getId: () => '/projeler', path: '/projeler', getParentRoute: () => __rootImport } as any),
  ReferanslarRoute: ReferanslarRouteImport.update({ getId: () => '/referanslar', path: '/referanslar', getParentRoute: () => __rootImport } as any),
  GizlilikPolitikasiRoute: GizlilikPolitikasiRouteImport.update({ getId: () => '/gizlilik-politikasi', path: '/gizlilik-politikasi', getParentRoute: () => __rootImport } as any),
  CerezPolitikasiRoute: CerezPolitikasiRouteImport.update({ getId: () => '/cerez-politikasi', path: '/cerez-politikasi', getParentRoute: () => __rootImport } as any),
  SssRoute: SssRouteImport.update({ getId: () => '/sss', path: '/sss', getParentRoute: () => __rootImport } as any),
  AdminLoginRoute: AdminLoginRouteImport.update({ getId: () => '/admin/login', path: '/admin/login', getParentRoute: () => __rootImport } as any),
  AdminProtectedRoute: AdminProtectedRouteImport.update({ getId: () => '/admin', path: '/admin', getParentRoute: () => __rootImport } as any)._addFileChildren({
    AdminDashboardRoute: AdminDashboardRouteImport.update({ getId: () => '/dashboard', path: '/dashboard', getParentRoute: () => AdminProtectedRouteImport } as any),
    AdminLeadsRoute: AdminLeadsRouteImport.update({ getId: () => '/leads', path: '/leads', getParentRoute: () => AdminProtectedRouteImport } as any),
    AdminProductsRoute: AdminProductsRouteImport.update({ getId: () => '/products', path: '/products', getParentRoute: () => AdminProtectedRouteImport } as any),
    AdminSettingsRoute: AdminSettingsRouteImport.update({ getId: () => '/settings', path: '/settings', getParentRoute: () => AdminProtectedRouteImport } as any),
  } as any),
  EnRoute: EnRouteImport.update({ getId: () => '/en', path: '/en', getParentRoute: () => __rootImport } as any)._addFileChildren({
    EnAboutRoute: EnAboutRouteImport.update({ getId: () => '/about', path: '/about', getParentRoute: () => EnRouteImport } as any),
    EnProductsRoute: EnProductsRouteImport.update({ getId: () => '/products', path: '/products', getParentRoute: () => EnRouteImport } as any)._addFileChildren({
      EnProductsSlugRoute: EnProductsSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => EnProductsRouteImport } as any),
    } as any),
    EnContactRoute: EnContactRouteImport.update({ getId: () => '/contact', path: '/contact', getParentRoute: () => EnRouteImport } as any),
    EnBlogRoute: EnBlogRouteImport.update({ getId: () => '/blog', path: '/blog', getParentRoute: () => EnRouteImport } as any)._addFileChildren({
      EnBlogSlugRoute: EnBlogSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => EnBlogRouteImport } as any),
    } as any),
    EnPortfolioRoute: EnPortfolioRouteImport.update({ getId: () => '/portfolio', path: '/portfolio', getParentRoute: () => EnRouteImport } as any)._addFileChildren({
      EnPortfolioSlugRoute: EnPortfolioSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => EnPortfolioRouteImport } as any),
    } as any),
  } as any),
  RuRoute: RuRouteImport.update({ getId: () => '/ru', path: '/ru', getParentRoute: () => __rootImport } as any)._addFileChildren({
    RuAboutRoute: RuAboutRouteImport.update({ getId: () => '/about', path: '/about', getParentRoute: () => RuRouteImport } as any),
    RuProductsRoute: RuProductsRouteImport.update({ getId: () => '/products', path: '/products', getParentRoute: () => RuRouteImport } as any)._addFileChildren({
      RuProductsSlugRoute: RuProductsSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => RuProductsRouteImport } as any),
    } as any),
    RuContactRoute: RuContactRouteImport.update({ getId: () => '/contact', path: '/contact', getParentRoute: () => RuRouteImport } as any),
    RuBlogRoute: RuBlogRouteImport.update({ getId: () => '/blog', path: '/blog', getParentRoute: () => RuRouteImport } as any)._addFileChildren({
      RuBlogSlugRoute: RuBlogSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => RuBlogRouteImport } as any),
    } as any),
    RuPortfolioRoute: RuPortfolioRouteImport.update({ getId: () => '/portfolio', path: '/portfolio', getParentRoute: () => RuRouteImport } as any)._addFileChildren({
      RuPortfolioSlugRoute: RuPortfolioSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => RuPortfolioRouteImport } as any),
    } as any),
  } as any),
  BlogRoute: BlogRouteImport.update({ getId: () => '/blog', path: '/blog', getParentRoute: () => __rootImport } as any)._addFileChildren({
    BlogIndexRoute: BlogIndexRouteImport.update({ getId: () => '/', path: '/', getParentRoute: () => BlogRouteImport } as any),
    BlogSlugRoute: BlogSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => BlogRouteImport } as any),
  } as any),
  UrunlerRoute: UrunlerRouteImport.update({ getId: () => '/urunler', path: '/urunler', getParentRoute: () => __rootImport } as any)._addFileChildren({
    UrunlerSlugRoute: UrunlerSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => UrunlerRouteImport } as any),
    UrunlerIndexRoute: UrunlerIndexRouteImport.update({ getId: () => '/', path: '/', getParentRoute: () => UrunlerRouteImport } as any),
  } as any),
  PortfolioRoute: PortfolioRouteImport.update({ getId: () => '/portfolio', path: '/portfolio', getParentRoute: () => __rootImport } as any)._addFileChildren({
    PortfolioSlugRoute: PortfolioSlugRouteImport.update({ getId: () => '/$slug', path: '/$slug', getParentRoute: () => PortfolioRouteImport } as any),
  } as any),
} as any)._addFileTypes({} as any);

export const getRouter = () => createRouter({ routeTree, context: { queryClient }, scrollRestoration: true, defaultPreloadStaleTime: 0 });
