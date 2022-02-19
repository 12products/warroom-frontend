type Accessor = () => any
type Directive = (node: Element, accessor: Accessor) => void

type SimpleDirectiveArg = (node: Element) => void
type DirectiveArg = [Directive, Accessor]

export const getUseDirectives =
  (...directives: (SimpleDirectiveArg | DirectiveArg)[]) =>
  (node: Element) => {
    directives.forEach((arg) => {
      const [directive, accessor] = Array.isArray(arg) ? arg : [arg, undefined]

      directive(node, accessor as any)
    })
  }
