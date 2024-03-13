import { Quill } from 'react-quill'

const LinkFormat = Quill.import('formats/link')

export class InternalLink extends LinkFormat {
  static create(value: any) {
    const node = super.create(value)
    value = (this as any).sanitize(value)
    node.setAttribute('href', value.replace(location.origin, ''))
    node.removeAttribute('target')
    node.removeAttribute('rel')
    return node
  }

  static register() {
    InternalLink.blotName = 'custom-link'
    InternalLink.tagName = 'a'
    Quill.register(InternalLink, true)
  }
}

export function registerFormats() {
  InternalLink.register()
}