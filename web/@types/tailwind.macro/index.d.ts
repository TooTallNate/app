declare module "react-aws-s3";

declare module "tailwind.macro" {
  type ReactClassPropKeys = keyof React.ClassAttributes<any>;
  type PropsOf<
    C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
  > = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;
  type Omit<T, U> = T extends any ? Pick<T, Exclude<keyof T, U>> : never;
  type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>;

  export interface CreateStyledComponent<
    ComponentProps extends {},
    SpecificComponentProps extends {} = {}
  > {
    (classes: TemplateStringsArray): import("@emotion/styled").StyledComponent<
      ComponentProps,
      SpecificComponentProps
    >;
    (
      template: TemplateStringsArray,
      classes: TemplateStringsArray
    ): import("@emotion/styled").StyledComponent<
      ComponentProps,
      SpecificComponentProps
    >;
  }

  type StyledTags = {
    [Tag in keyof JSX.IntrinsicElements]: CreateStyledComponent<
      {},
      JSX.IntrinsicElements[Tag]
    >;
  };

  interface TailwindMacro extends StyledTags {
    (classes: TemplateStringsArray): any;

    styled<C extends React.ComponentType<React.ComponentProps<C>>>(
      component: C,
      options?: import("@emotion/styled").StyledOptions
    ): CreateStyledComponent<PropsOf<C>, {}>;

    styled<Tag extends keyof JSX.IntrinsicElements>(
      tag: Tag,
      options?: import("@emotion/styled").StyledOptions
    ): CreateStyledComponent<{}, JSX.IntrinsicElements[Tag]>;
  }

  const tw: TailwindMacro;
  export default tw;
}
