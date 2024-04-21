import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_HIuUkYty.mjs';
import 'cssesc';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"carrito/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/carrito","isIndex":false,"type":"page","pattern":"^\\/carrito\\/?$","segments":[[{"content":"carrito","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/carrito.astro","pathname":"/carrito","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"order/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/order","isIndex":false,"type":"page","pattern":"^\\/order\\/?$","segments":[[{"content":"order","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/order.astro","pathname":"/order","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"politicas/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/politicas","isIndex":false,"type":"page","pattern":"^\\/politicas\\/?$","segments":[[{"content":"politicas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politicas.astro","pathname":"/politicas","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"search.json","links":[],"scripts":[],"styles":[],"routeData":{"route":"/search.json","isIndex":false,"type":"endpoint","pattern":"^\\/search\\.json\\/?$","segments":[[{"content":"search.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.json.ts","pathname":"/search.json","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"tyc/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tyc","isIndex":false,"type":"page","pattern":"^\\/tyc\\/?$","segments":[[{"content":"tyc","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tyc.astro","pathname":"/tyc","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"redirect","isIndex":false,"route":"/old-page","pattern":"^\\/old-page\\/?$","segments":[[{"content":"old-page","dynamic":false,"spread":false}]],"params":[],"component":"/old-page","pathname":"/old-page","prerender":false,"redirect":"/new-page","fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://muuch-maaya.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/carrito.astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/catalogo/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/catalogo/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/categorias/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/categorias/[tag]/[page].astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/contact.astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/order.astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/politicas.astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/pages/tyc.astro",{"propagation":"in-tree","containsHead":true}],["/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/carrito@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/catalogo/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/catalogo/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/categorias/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/categorias/[tag]/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/contact@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/order@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/politicas@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tyc@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_sCzvoSbb.mjs","\u0000@astrojs-manifest":"manifest_nqbzAYet.mjs","/Volumes/externalssd/ws/Astro/muuch-maaya-ts/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_3wEZly-Z.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_X-Ug6Cbt.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_Qq9s3ulC.mjs","\u0000@astro-page:src/pages/carrito@_@astro":"chunks/carrito_796IaCnX.mjs","\u0000@astro-page:src/pages/catalogo/[slug]@_@astro":"chunks/_slug__o_p7xFJc.mjs","\u0000@astro-page:src/pages/catalogo/[...page]@_@astro":"chunks/_.._QN7WilJ4.mjs","\u0000@astro-page:src/pages/categorias/[tag]/[page]@_@astro":"chunks/_page__x_J3qXK-.mjs","\u0000@astro-page:src/pages/categorias/[...page]@_@astro":"chunks/_.._IX1Z-dZo.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_ni_jJiUF.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact_GaYg5HWn.mjs","\u0000@astro-page:src/pages/order@_@astro":"chunks/order_bw7qiDTU.mjs","\u0000@astro-page:src/pages/politicas@_@astro":"chunks/politicas_epaTtVap.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"chunks/robots_Q5HEVoZ-.mjs","\u0000@astro-page:src/pages/search.json@_@ts":"chunks/search_UUUXxZCG.mjs","\u0000@astro-page:src/pages/tyc@_@astro":"chunks/tyc_KAlCYpOy.mjs","/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/components/CardCatalog":"_astro/CardCatalog.Kb-JYVk_.js","/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/components/Ticket":"_astro/Ticket.BcYqVpRv.js","/Volumes/externalssd/ws/Astro/muuch-maaya-ts/src/components/SendTicketForm":"_astro/SendTicketForm.sdr1H0ja.js","/astro/hoisted.js?q=0":"_astro/hoisted.9F7AbTbl.js","@astrojs/react/client.js":"_astro/client.olTvLX7Y.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/carrito.imVqM0OO.css","/favicon.ico","/favicon.svg","/hero.jpg","/logo-vertical-dark.png","/logo-vertical-light.jpg","/logo-vertical-negro-light.jpg","/logo.png","/robots.txt","/_astro/CardCatalog.Kb-JYVk_.js","/_astro/SendTicketForm.sdr1H0ja.js","/_astro/Ticket.BcYqVpRv.js","/_astro/client.olTvLX7Y.js","/_astro/hoisted.9F7AbTbl.js","/_astro/index.0CZuico2.js","/_astro/index.LFf77hJu.js","/_astro/ticketStore.XeD6LfZM.js","/branches/Jarritos_Logo.png","/branches/Penafiel_Logo.png","/branches/Pepsi_logo.png","/branches/Unilever.png","/branches/ZUCARMEX.png","/branches/calvario.png","/branches/cocalogo.png","/branches/colgate.png","/branches/corona.png","/branches/moctezuma.png","/branches/pinollogo.png","/branches/vingolingo.jpeg","/festivals/corona.png","/festivals/edc.png","/festivals/f1.jpeg","/festivals/festival_arre.png","/festivals/logo-coca-grande.png","/festivals/tecate.png","/404.html","/carrito/index.html","/index.html","/contact/index.html","/order/index.html","/politicas/index.html","/robots.txt","/search.json","/tyc/index.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
