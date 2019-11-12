declare module "tailwind.macro" {
  type JSXInEl = JSX.IntrinsicElements;
  type ReactClassPropKeys = keyof React.ClassAttributes<any>;
  type PropsOf<
    C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
  > = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;
  type Omit<T, U> = T extends any ? Pick<T, Exclude<keyof T, U>> : never;
  type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>;

  interface CreateStyledComponentBase<InnerProps, ExtraProps> {
    <
      StyleProps extends Omit<
        Overwrapped<InnerProps, StyleProps>,
        ReactClassPropKeys
      > = Omit<InnerProps & ExtraProps, ReactClassPropKeys>
    >(
      classes: TemplateStringsArray
    ): import("@emotion/styled").StyledComponent<InnerProps, StyleProps, {}>;
  }

  type CreateStyledComponentIntrinsic<
    Tag extends keyof JSXInEl,
    ExtraProps
  > = CreateStyledComponentBase<JSXInEl[Tag], ExtraProps>;

  type CreateStyledComponentExtrinsic<
    Tag extends React.ComponentType<any>,
    ExtraProps
  > = CreateStyledComponentBase<PropsOf<Tag>, ExtraProps>;

  interface TailwindMacro {
    (
      classes: TemplateStringsArray
    ): import("@emotion/core").InterpolationWithTheme<{}>;

    styled<Tag extends React.ComponentType<any>, ExtraProps = {}>(
      tag: Tag,
      options?: import("@emotion/styled").StyledOptions
    ): CreateStyledComponentExtrinsic<Tag, ExtraProps>;

    styled<Tag extends keyof JSXInEl, ExtraProps = {}>(
      tag: Tag,
      options?: import("@emotion/styled").StyledOptions
    ): CreateStyledComponentIntrinsic<Tag, ExtraProps>;

    a: CreateStyledComponentIntrinsic<"a", {}>;
    abbr: CreateStyledComponentIntrinsic<"abbr", {}>;
    address: CreateStyledComponentIntrinsic<"address", {}>;
    area: CreateStyledComponentIntrinsic<"area", {}>;
    article: CreateStyledComponentIntrinsic<"article", {}>;
    aside: CreateStyledComponentIntrinsic<"aside", {}>;
    audio: CreateStyledComponentIntrinsic<"audio", {}>;
    b: CreateStyledComponentIntrinsic<"b", {}>;
    base: CreateStyledComponentIntrinsic<"base", {}>;
    bdi: CreateStyledComponentIntrinsic<"bdi", {}>;
    bdo: CreateStyledComponentIntrinsic<"bdo", {}>;
    big: CreateStyledComponentIntrinsic<"big", {}>;
    blockquote: CreateStyledComponentIntrinsic<"blockquote", {}>;
    body: CreateStyledComponentIntrinsic<"body", {}>;
    br: CreateStyledComponentIntrinsic<"br", {}>;
    button: CreateStyledComponentIntrinsic<"button", {}>;
    canvas: CreateStyledComponentIntrinsic<"canvas", {}>;
    caption: CreateStyledComponentIntrinsic<"caption", {}>;
    cite: CreateStyledComponentIntrinsic<"cite", {}>;
    code: CreateStyledComponentIntrinsic<"code", {}>;
    col: CreateStyledComponentIntrinsic<"col", {}>;
    colgroup: CreateStyledComponentIntrinsic<"colgroup", {}>;
    data: CreateStyledComponentIntrinsic<"data", {}>;
    datalist: CreateStyledComponentIntrinsic<"datalist", {}>;
    dd: CreateStyledComponentIntrinsic<"dd", {}>;
    del: CreateStyledComponentIntrinsic<"del", {}>;
    details: CreateStyledComponentIntrinsic<"details", {}>;
    dfn: CreateStyledComponentIntrinsic<"dfn", {}>;
    dialog: CreateStyledComponentIntrinsic<"dialog", {}>;
    div: CreateStyledComponentIntrinsic<"div", {}>;
    dl: CreateStyledComponentIntrinsic<"dl", {}>;
    dt: CreateStyledComponentIntrinsic<"dt", {}>;
    em: CreateStyledComponentIntrinsic<"em", {}>;
    embed: CreateStyledComponentIntrinsic<"embed", {}>;
    fieldset: CreateStyledComponentIntrinsic<"fieldset", {}>;
    figcaption: CreateStyledComponentIntrinsic<"figcaption", {}>;
    figure: CreateStyledComponentIntrinsic<"figure", {}>;
    footer: CreateStyledComponentIntrinsic<"footer", {}>;
    form: CreateStyledComponentIntrinsic<"form", {}>;
    h1: CreateStyledComponentIntrinsic<"h1", {}>;
    h2: CreateStyledComponentIntrinsic<"h2", {}>;
    h3: CreateStyledComponentIntrinsic<"h3", {}>;
    h4: CreateStyledComponentIntrinsic<"h4", {}>;
    h5: CreateStyledComponentIntrinsic<"h5", {}>;
    h6: CreateStyledComponentIntrinsic<"h6", {}>;
    head: CreateStyledComponentIntrinsic<"head", {}>;
    header: CreateStyledComponentIntrinsic<"header", {}>;
    hgroup: CreateStyledComponentIntrinsic<"hgroup", {}>;
    hr: CreateStyledComponentIntrinsic<"hr", {}>;
    html: CreateStyledComponentIntrinsic<"html", {}>;
    i: CreateStyledComponentIntrinsic<"i", {}>;
    iframe: CreateStyledComponentIntrinsic<"iframe", {}>;
    img: CreateStyledComponentIntrinsic<"img", {}>;
    input: CreateStyledComponentIntrinsic<"input", {}>;
    ins: CreateStyledComponentIntrinsic<"ins", {}>;
    kbd: CreateStyledComponentIntrinsic<"kbd", {}>;
    keygen: CreateStyledComponentIntrinsic<"keygen", {}>;
    label: CreateStyledComponentIntrinsic<"label", {}>;
    legend: CreateStyledComponentIntrinsic<"legend", {}>;
    li: CreateStyledComponentIntrinsic<"li", {}>;
    link: CreateStyledComponentIntrinsic<"link", {}>;
    main: CreateStyledComponentIntrinsic<"main", {}>;
    map: CreateStyledComponentIntrinsic<"map", {}>;
    mark: CreateStyledComponentIntrinsic<"mark", {}>;
    menu: CreateStyledComponentIntrinsic<"menu", {}>;
    menuitem: CreateStyledComponentIntrinsic<"menuitem", {}>;
    meta: CreateStyledComponentIntrinsic<"meta", {}>;
    meter: CreateStyledComponentIntrinsic<"meter", {}>;
    nav: CreateStyledComponentIntrinsic<"nav", {}>;
    noscript: CreateStyledComponentIntrinsic<"noscript", {}>;
    object: CreateStyledComponentIntrinsic<"object", {}>;
    ol: CreateStyledComponentIntrinsic<"ol", {}>;
    optgroup: CreateStyledComponentIntrinsic<"optgroup", {}>;
    option: CreateStyledComponentIntrinsic<"option", {}>;
    output: CreateStyledComponentIntrinsic<"output", {}>;
    p: CreateStyledComponentIntrinsic<"p", {}>;
    param: CreateStyledComponentIntrinsic<"param", {}>;
    picture: CreateStyledComponentIntrinsic<"picture", {}>;
    pre: CreateStyledComponentIntrinsic<"pre", {}>;
    progress: CreateStyledComponentIntrinsic<"progress", {}>;
    q: CreateStyledComponentIntrinsic<"q", {}>;
    rp: CreateStyledComponentIntrinsic<"rp", {}>;
    rt: CreateStyledComponentIntrinsic<"rt", {}>;
    ruby: CreateStyledComponentIntrinsic<"ruby", {}>;
    s: CreateStyledComponentIntrinsic<"s", {}>;
    samp: CreateStyledComponentIntrinsic<"samp", {}>;
    script: CreateStyledComponentIntrinsic<"script", {}>;
    section: CreateStyledComponentIntrinsic<"section", {}>;
    select: CreateStyledComponentIntrinsic<"select", {}>;
    small: CreateStyledComponentIntrinsic<"small", {}>;
    source: CreateStyledComponentIntrinsic<"source", {}>;
    span: CreateStyledComponentIntrinsic<"span", {}>;
    strong: CreateStyledComponentIntrinsic<"strong", {}>;
    style: CreateStyledComponentIntrinsic<"style", {}>;
    sub: CreateStyledComponentIntrinsic<"sub", {}>;
    summary: CreateStyledComponentIntrinsic<"summary", {}>;
    sup: CreateStyledComponentIntrinsic<"sup", {}>;
    table: CreateStyledComponentIntrinsic<"table", {}>;
    tbody: CreateStyledComponentIntrinsic<"tbody", {}>;
    td: CreateStyledComponentIntrinsic<"td", {}>;
    textarea: CreateStyledComponentIntrinsic<"textarea", {}>;
    tfoot: CreateStyledComponentIntrinsic<"tfoot", {}>;
    th: CreateStyledComponentIntrinsic<"th", {}>;
    thead: CreateStyledComponentIntrinsic<"thead", {}>;
    time: CreateStyledComponentIntrinsic<"time", {}>;
    title: CreateStyledComponentIntrinsic<"title", {}>;
    tr: CreateStyledComponentIntrinsic<"tr", {}>;
    track: CreateStyledComponentIntrinsic<"track", {}>;
    u: CreateStyledComponentIntrinsic<"u", {}>;
    ul: CreateStyledComponentIntrinsic<"ul", {}>;
    var: CreateStyledComponentIntrinsic<"var", {}>;
    video: CreateStyledComponentIntrinsic<"video", {}>;
    wbr: CreateStyledComponentIntrinsic<"wbr", {}>;

    circle: CreateStyledComponentIntrinsic<"circle", {}>;
    clipPath: CreateStyledComponentIntrinsic<"clipPath", {}>;
    defs: CreateStyledComponentIntrinsic<"defs", {}>;
    ellipse: CreateStyledComponentIntrinsic<"ellipse", {}>;
    foreignObject: CreateStyledComponentIntrinsic<"foreignObject", {}>;
    g: CreateStyledComponentIntrinsic<"g", {}>;
    image: CreateStyledComponentIntrinsic<"image", {}>;
    line: CreateStyledComponentIntrinsic<"line", {}>;
    linearGradient: CreateStyledComponentIntrinsic<"linearGradient", {}>;
    mask: CreateStyledComponentIntrinsic<"mask", {}>;
    path: CreateStyledComponentIntrinsic<"path", {}>;
    pattern: CreateStyledComponentIntrinsic<"pattern", {}>;
    polygon: CreateStyledComponentIntrinsic<"polygon", {}>;
    polyline: CreateStyledComponentIntrinsic<"polyline", {}>;
    radialGradient: CreateStyledComponentIntrinsic<"radialGradient", {}>;
    rect: CreateStyledComponentIntrinsic<"rect", {}>;
    stop: CreateStyledComponentIntrinsic<"stop", {}>;
    svg: CreateStyledComponentIntrinsic<"svg", {}>;
    text: CreateStyledComponentIntrinsic<"text", {}>;
    tspan: CreateStyledComponentIntrinsic<"tspan", {}>;
  }

  const tw: TailwindMacro;
  export default tw;
}
