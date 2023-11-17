export interface IVdom {
  tag?: string
  attr?: Record<string, string>
  children?: IVdom[] | string
}

export class Vdom implements IVdom {
  tag?: string
  attr?: Record<string, string>
  children?: Vdom[] | string

  constructor({ tag, attr, children }: IVdom) {
    this.tag = tag
    this.attr = attr
    this.children = typeof children === 'string'
      ? children
      : children?.map((child: IVdom) => {
        return child instanceof Vdom ? child : new Vdom(child)
      })
  }

  toString(): string {
    const { tag = '', attr = {}, children = '' } = this
    const childrenStr = typeof children === 'string' ? children : children.map(child => child.toString()).join('')
    if (!tag) return childrenStr // <>{children}</> => children
    const attrStr = Object.entries(attr).map(([key, value]) => ` ${key}="${value}"`).join('')
    return `<${tag}${attrStr}>${childrenStr}</${tag}>`
  }
}
