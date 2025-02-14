# 🎄 md-editor-rt

![](https://img.shields.io/github/package-json/v/imzbf/md-editor-rt) ![](https://img.shields.io/npm/dm/md-editor-rt) ![](https://img.shields.io/github/license/imzbf/md-editor-rt) ![](https://img.shields.io/badge/ssr-%3E1.0.0-brightgreen) ![](https://img.shields.io/badge/webcomponent-%3E4.19.0-brightgreen)

English \| [中文](https://github.com/imzbf/md-editor-rt/blob/develop/README-CN.md)

Markdown editor for `react`, developed in `jsx` and `typescript`.

- Documentation and demo：[Go](https://imzbf.github.io/md-editor-rt)

- Use it online：[Go](https://codesandbox.io/s/elated-khorana-65jmr)

- The same series editor for vue3：[md-editor-v3](https://github.com/imzbf/md-editor-v3)

## ⭐️ Features

- Toolbar, screenfull or screenfull in web pages and so on.
- Themes, Built-in default and dark themes.
- Shortcut key for editor.
- Beautify your content by `prettier`(only for markdown content, not the code and other text).
- Multi-language, build-in Chinese and English(default: Chinese).
- Upload picture, paste or clip the picture and upload it.
- Render article directly(no editor, no event listener, only preview content).
- Theme of preview, `default`, `vuepress`, `github`, `cyanosis`, `mk-cute`, `smart-blue` styles(not identical). It can be customized also(Refer to example page).
- `mermaid`(>=1.3.0), `katex` mathematical formula（>=1.4.0）.
- Customize the toolbar as you like.
- On-demand Import(>=4.0.0).

## 📦 Install

```shell
yarn add md-editor-rt
```

Use existing extension of language and theme, such as Japanese

```shell
yarn add @vavt/cm-extension
```

Use existing components of toolbar, such as exporting content as PDF

```shell
yarn add @vavt/v3-extension
```

For more ways to use or contribute, please refer to: [md-editor-extension](https://github.com/imzbf/md-editor-extension)

## 💡 Usage

When using server-side rendering, make sure to set `editorId` to a constant value.

Starting from `4.0.0`, internal components can be imported on-demand.

### ✍🏻 Display Editor

```jsx
import React, { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default () => {
  const [text, setText] = useState('# Hello Editor');
  return <MdEditor modelValue={text} onChange={setText} />;
};
```

### 📖 Preview Only

```jsx
import React, { useState } from 'react';
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';

const scrollElement = document.documentElement;

export default () => {
  const [text] = useState('# Hello Editor');
  const [id] = useState('preview-only');

  return (
    <>
      <MdPreview editorId={id} modelValue={text} />
      <MdCatalog editorId={id} scrollElement={scrollElement} />
    </>
  );
};
```

When using server-side rendering, `scrollElement` should be of string type, eg: `body`, `#id`, `.class`.

## 🗺 Preview

| Default theme | Dark theme | Preview only |
| --- | --- | --- |
| ![](https://imzbf.github.io/md-editor-rt/imgs/preview-light.png) | ![](https://imzbf.github.io/md-editor-rt/imgs/preview-dark.png) | ![](https://imzbf.github.io/md-editor-rt/imgs/preview-previewOnly.png) |

Inputing prompt and mark, emoji extensions

![](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)

## 🎁 Apis

### 🔖 MdPreivew Props

| name | type | default | description |
| --- | --- | --- | --- |
| modelValue | `string` | '' | Markdown content |
| theme | `'light' \| 'dark'` | 'light' | Editor theme |
| className | `string` | '' |  |
| style | `CSSProperties` | {} | Editor inline style |
| language | `string` | 'zh-CN' | Build-in language('zh-CN','en-US') |
| editorId | `string` | 'md-editor-rt\_[\d]' | Editor's id, default incrementing by number. When using server-side rendering, make sure to set this attribute to a constant value |
| showCodeRowNumber | `boolean` | true | Show row number for code block or not |
| previewTheme | `'default' \| 'github' \| 'vuepress' \| 'mk-cute' \| 'smart-blue' \| 'cyanosis'` | 'default' | Preview theme, can be customized |
| noMermaid | `boolean` | false | Use mermaid or not |
| noKatex | `boolean` | false | Use katex or not |
| codeTheme | `'atom' \| 'a11y' \| 'github' \| 'gradient' \| 'kimbie' \| 'paraiso' \| 'qtcreator' \| 'stackoverflow'` | 'atom' | Highlight code style, can be customized also |
| mdHeadingId | `(text: string, level: number, index: number) => string` | (text) => text | H1-H6 `ID` generator |
| sanitize | `(html: string) => string` | (html) => html | This attribute is used to alter the compiled HTML content |
| noIconfont | `boolean` | false | Not append iconfont script, you can get the latest link [here](https://imzbf.github.io/md-editor-rt/en-US/docs#%F0%9F%A4%9E%F0%9F%8F%BC%20noIconfont) |
| formatCopiedText | `(text: string) => string` | (text: string) => text | Format copied code |
| codeStyleReverse | `boolean` | true | Code style will be reversed to dark while code block of the theme has a dark background |
| codeStyleReverseList | `Array<string>` | ['default', 'mk-cute'] | Themes to be reversed |
| noHighlight | `boolean` | false | Highlight code or not |
| noImgZoomIn | `boolean` | false | Enable the function of enlarging images |
| customIcon | `CustomIcon` | {} | Customized icons |
| sanitizeMermaid | `(h: string) => Promise<string>` | (h: string) => Promise.resolve(h) | Convert the generated mermaid code |
| codeFoldable | `boolean` | true | Whether to enable code folding feature |
| autoFoldThreshold | `number` | 30 | Threshold for triggering automatic code folding by line count |

### 🔩 MdEditor Props

Except for the same as `MdPreview`:

| name | type | default | description |
| --- | --- | --- | --- |
| pageFullscreen | `boolean` | false | Screenfull in web page |
| preview | `boolean` | true | Preview content in editor |
| htmlPreview | `boolean` | false | Preview html in editor(If true, preview must be false) |
| toolbars | `Array<ToolbarNames \| number>` | [toolbars] | Show contents of toolbar, all keys<sup>see `toolbars` below</sup> |
| toolbarsExclude | `Array<ToolbarNames \| number>` | [] | Don't show contents of toolbar, all keys`toolbars` |
| noPrettier | `boolean` | false | Use prettier to beautify content or not |
| tabWidth | `number` | 2 | One tab eq some spaces |
| tableShape | `[number, number] \| [number, number, number, number]` | [6, 4] | Preset the size of the table, [columns, rows, Maximum number of columns, Maximum number of rows] |
| placeholder | `string` | '' |  |
| defToolbars | `Array<DropdownToolbar \| NormalToolbar \| ModalToolbar>` | [] | Custom toolbar in `DropdownToolbar`, `NormalToolbar` or `ModalToolbar` |
| footers | `Array<'markdownTotal' \| '=' \| 'scrollSwitch' \| number>` | ['markdownTotal', '=', 'scrollSwitch'] | Show contents of footer, they are divided by `'='`. Set it to `[]` to hidden footer |
| scrollAuto | `boolean` | true | Scroll default setting |
| defFooters | `Array<string \| ReactElement>` | [] | Custom footer |
| noUploadImg | `boolean` | false | Not show the entrance to upload pictures |
| autoFocus | `boolean` | false | same as `autofocus` in native textarea |
| disabled | `boolean` | false | same as `disabled` in native textarea |
| readOnly | `boolean` | false | same as `readonly` in native textarea |
| maxLength | `number` |  | same as `maxlength` in native textarea |
| autoDetectCode | `boolean` | false | auto detect the type of pasted code, only support that copied from `vscode` |
| completions | `Array<CompletionSource>` | [] | `@codemirror/autocomplete` List of function to match keywords |
| showToolbarName | `boolean` | false | Show toolbar name or not |
| inputBoxWitdh | `string` | '50%' | Default width of input box |
| transformImgUrl | `(imgUrl: string) => string \| Promise<string>` | t => t | Transform image links |

<details>
 <summary>『toolbars』</summary>

```js
[
  'bold',
  'underline',
  'italic',
  '-',
  'strikeThrough',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task', // ^2.4.0
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'previewOnly',
  'htmlPreview',
  'catalog',
  'github'
];
```

</details>

> You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`!

<details>
 <summary>『StaticTextDefaultValue』</summary>

Expand language, you need to replace all the content here:

```typescript
export interface ToolbarTips {
  bold?: string;
  underline?: string;
  italic?: string;
  strikeThrough?: string;
  title?: string;
  sub?: string;
  sup?: string;
  quote?: string;
  unorderedList?: string;
  orderedList?: string;
  task?: string; // ^2.4.0
  codeRow?: string;
  code?: string;
  link?: string;
  image?: string;
  table?: string;
  mermaid?: string;
  katex?: string;
  revoke?: string;
  next?: string;
  save?: string;
  prettier?: string;
  pageFullscreen?: string;
  fullscreen?: string;
  catalog?: string;
  preview?: string;
  previewOnly?: string;
  htmlPreview?: string;
  github?: string;
  '-'?: string;
  '='?: string;
}

export interface StaticTextDefaultValue {
  // Toolbar hover tips(html title)
  toolbarTips?: ToolbarTips;
  // h1-h6 dropdown menu item
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  // v1.6.0
  imgTitleItem?: {
    link: string;
    upload: string;
    clip2upload: string;
  };
  // The modal tips of add link or upload picture
  linkModalTips?: {
    linkTitle?: string;
    imageTitle?: string;
    descLabel?: string;
    descLabelPlaceHolder?: string;
    urlLabel?: string;
    urlLabelPlaceHolder?: string;
    buttonOK?: string;
  };
  // The modal tips of clip the picture, v1.2.0
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  // Copy code tips, v1.1.4
  copyCode?: {
    text?: string;
    successTips?: string;
    failTips?: string;
  };
  // 1.8.0
  mermaid?: {
    flow?: string;
    sequence?: string;
    gantt?: string;
    class?: string;
    state?: string;
    pie?: string;
    relationship?: string;
    journey?: string;
  };
  // 1.9.0
  katex?: {
    // formula inline
    inline: string;
    // formula block
    block: string;
  };
  footer?: {
    markdownTotal: string;
    scrollAuto: string;
  };
}
```

</details>

### 🧵 MdPreview Events

| name | type | description |
| --- | --- | --- |
| onChange | `value: string` | Content changed(bind to `oninput` of `textarea`) |
| onHtmlChanged | `html: string` | Compile markdown successful event, you can use it to get the html code |
| onGetCatalog | `list: Array<HeadList>` | Get catalog of article |

### 🪢 MdEditor Events

Except for the same as `MdPreview`:

| name | type | description |
| --- | --- | --- |
| onSave | `value: string, html: Promise<string>` | Saving content, `ctrl+s` and clicking button will trigger it |
| onUploadImg | `files: Array<File>, callback: (urls: string[] \| { url: string; alt: string; title: string }[]) => void` | Uploading picture, when picture is uploading the modal will not close, please provide right urls to the callback function |
| onError | `err: { name: 'Cropper' \| 'fullscreen' \| 'prettier' \| 'overlength'; message: string }` | Catch run-time error, `Cropper`, `fullscreen` and `prettier` are used when they are not loaded. And content exceeds the length limit error |
| onBlur | `event: FocusEvent<HTMLTextAreaElement, Element>` | Textarea has lost focus |
| onFocus | `event: FocusEvent<HTMLTextAreaElement, Element>` | Textarea has received focus |
| onInput | `event: Event` | Element gets input |
| onDrop | `event: DragEvent` | Selection is being dragged |
| onInputBoxWitdhChange | `(width: string) => void` | Width of input box has been changed |

## 🤱🏼 Expose

After 2.5.0, Editor exposes several methods on the instance, used to get or change the internal status of the editor.

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { MdEditor, ExposeParam } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default () => {
  const [text, setText] = useState('#Hello Editor');

  const editorRef = useRef<ExposeParam>();

  useEffect(() => {
    editorRef.current?.on('catalog', console.log);
  }, []);

  return <MdEditor ref={editorRef} modelValue={text} onChange={setText} />;
};
```

> Switched to the opposite status, if toggle without input parameter.

### 👂🏼 on

Get the internal state of the editor, including pageFullscreen, fullscreen, preview, htmlPreview, catalog, etc.

```ts
type Keys =
  | 'pageFullscreen'
  | 'fullscreen'
  | 'preview'
  | 'previewOnly'
  | 'htmlPreview'
  | 'catalog';
```

```js
editorRef.current?.on('pageFullscreen', (status) => console.log(status));
```

### 💻 togglePageFullscreen

Toggle status of fullscreen within the page.

```js
editorRef.current?.togglePageFullscreen(true);
```

### 🖥 toggleFullscreen

Toggle status of fullscreen widthin browser.

```js
editorRef.current?.toggleFullscreen(true);
```

### 📖 togglePreview

Toggle status of preview.

```js
editorRef.current?.togglePreview(true);
```

### 📖 togglePreviewOnly

Toggle into Preview Only Mode

```js
editorRef.current?.togglePreviewOnly(true);
```

### 📼 toggleHtmlPreview

Toggle status of htmlPreview.

```js
editorRef.current?.toggleHtmlPreview(true);
```

### 🧬 toggleCatalog

Toggle status of catalog.

```js
editorRef.current?.toggleCatalog(true);
```

### 💾 triggerSave

Save actions will be triggered.

### 💉 insert

Manually insert content into textarea.

```js
/**
 * @params selectedText
 */
editorRef.current?.insert((selectedText) => {
  /**
   * @return targetValue    Content to be inserted
   * @return select         Automatically select content, default: true
   * @return deviationStart Start position of the selected content, default: 0
   * @return deviationEnd   End position of the selected content, default: 0
   */
  return {
    targetValue: `${selectedText}`,
    select: true,
    deviationStart: 0,
    deviationEnd: 0
  };
});
```

For more examples, refer to source code of [extension component](https://github.com/imzbf/md-editor-rt/blob/dev-docs/src/components/MarkExtension/index.tsx)

### 🎯 focus

Focus on textarea.

```ts
import type { FocusOption } from 'md-editor-rt';

const option: FocusOption | undefined = 'start';

// Cursor position when focusing on textarea, default: position when it last lost focus
editorRef.current?.focus(option);
```

### ✒️ rerender

Re render the content.

### 🔍 getSelectedText

Get the currently selected text.

### 🗑 resetHistory

Clear current history.

### 🎛 domEventHandlers

Supports listening to all DOM events.

```js
editorRef.current?.domEventHandlers({
  compositionstart: () => {
    console.log('compositionstart');
  }
});
```

### 🎛 execCommand

Insert content into the editor via trigger.

```js
editorRef.current?.execCommand('bold');
```

### 🔖 getEditorView

Get codemirror instance.

## 💴 Config Editor

Use `config(option: ConfigOption)` to reconfigure `markdown-it` and so on.

> [!WARNING]
>
> We recommend configuring it at the project entry point, such as in `main.js` for projects created with Vite. Avoid calling `config` within components!

### codeMirrorExtensions

Customize new extensions based on theme and default extensions f codeMirror.

Example: Editor does not render the line number of textarea by default, this extension needs to be manually added

```js
import { config } from 'md-editor-rt';
import { lineNumbers } from '@codemirror/view';

config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  }
});
```

### markdownItConfig

Customize extensions, attributes of `markdown-it`, etc.

```ts
type MarkdownItConfig = (
  md: markdownit,
  options: {
    editorId: string;
  }
) => void;
```

Example: Use `markdown-it-anchor` to render a hyperlink symbol to the right of the title

```js
import { config } from 'md-editor-rt';
import ancher from 'markdown-it-anchor';

config({
  markdownItConfig(mdit) {
    mdit.use(ancher, {
      permalink: true
    });
  }
});
```

### markdownItPlugins

Select and add built-in plugins to `markdown-it`.

```ts
type MarkdownItPlugins = (
  plugins: Array<MarkdownItConfigPlugin>,
  options: {
    editorId: string;
  }
) => Array<MarkdownItConfigPlugin>;
```

Example: Modify the class name of the image.

```js
import { config } from 'md-editor-rt';

config({
  markdownItPlugins(plugins) {
    return plugins.map((p) => {
      if (p.type === 'image') {
        return {
          ...p,
          options: {
            ...p.options,
            classes: 'my-class'
          }
        };
      }

      return p;
    });
  }
});
```

### editorConfig

Add more languages, reset `mermaid` template or delay rendering time:

```js
import { config } from 'md-editor-rt';

config({
  editorConfig: {
    languageUserDefined: { lang: StaticTextDefaultValue },
    mermaidTemplate: {
      flow: `flow tempalte`,
      ...more
    },
    // Default 500ms. It is set to 0ms when preview only and not set.
    renderDelay: 500,
    // for modal component
    zIndex: 2000
  }
});
```

### editorExtensions

Config some dependency libraries, like highlight..

```js
import { config } from 'md-editor-rt';

config({
  editorExtensions: { iconfont: 'https://xxx.cc' }
});
```

<details>
  <summary>『EditorExtensions』</summary>

```typescript
export interface EditorExtensions {
  highlight?: {
    instance?: any;
    js?: string;
    css?: {
      [key: string]: {
        light: string;
        dark: string;
      };
    };
  };
  prettier?: {
    standaloneJs?: string;
    parserMarkdownJs?: string;
  };
  cropper?: {
    instance?: any;
    js?: string;
    css?: string;
  };
  iconfont?: string;
  screenfull?: {
    instance?: any;
    js?: string;
  };
  mermaid?: {
    instance?: any;
    js?: string;
  };
  katex?: {
    instance?: any;
    js?: string;
    css?: string;
  };
}
```

</details>

### editorExtensionsAttrs

Synchronously add attributes to the CDN link tags, consistent with the type of `editorExtensions`, with a value type of `HTMLElementTagNameMap['tagName']`.

```js
import { config, editorExtensionsAttrs } from 'md-editor-rt';

config({
  editorExtensionsAttrs
});
```

Do not attempt to define the src \ onload \ id of the script and rel \ href \ id of the link in editorExtensionsAttrs, as they will be overwritten by default values

### 🫨 iconfontType

Set the way to display icons:

- `svg`: with symbol
- `class`: with font-class

If the icon is customized through the attribute `customIcon`, the customized icon will be used first.

### 🎨 mermaidConfig

Configure `mermaid`, [Details](https://mermaid.js.org/config/schema-docs/config.html)

```js
import { config } from 'md-editor-rt';

config({
  mermaidConfig(base: any) {
    return {
      ...base,
      logLevel: 'error'
    };
  }
});
```

### 🔧 katexConfig

Configure `katex`, [Details](https://katex.org/docs/options)

```js
import { config } from 'md-editor-rt';

config({
  katexConfig(base: any) {
    return {
      ...base,
      strict: false
    };
  }
});
```

## 🪡 Shortcut Key

_Pay attention: shortcut keys are only available when the textarea has received focus!_

| key | function | description |
| --- | --- | --- |
| TAB | insert space | Insert space, the length eq `tabWidth`, default: 2, support multiline |
| SHIFT + TAB | delete space, setting is the same as Tab |  |
| CTRL + C | copy | When selected, copy the selected content. When not selected, copy the content of the current line |
| CTRL + X | shear | When selected, cut the selected content. When not selected, cut the current line |
| CTRL + D | delete | When selected, delete the selected content. When not selected, delete the current line |
| CTRL + S | save | Trigger `onSave` event |
| CTRL + B | bold text | `**bold**` |
| CTRL + U | underline | `<u>underline</u>` |
| CTRL + I | italic | `*italic*` |
| CTRL + 1-6 | h1-h6 | `# title` |
| CTRL + ↑ | superscript | `<sup>superscript</sup>` |
| CTRL + ↓ | subscript | `<sub>subscript</sub>` |
| CTRL + O | ordered list | `1. ordered list` |
| CTRL + L | link | `[link](https://github.com/imzbf/md-editor-rt)` |
| CTRL + Z | withdraw | Withdraw history in editor, not the function of system |
| CTRL + SHIFT + S | line-through | `~line-through~` |
| CTRL + SHIFT + U | unordered list | `- unordered list` |
| CTRL + SHIFT + C | code block |  |
| CTRL + SHIFT + I | picture | `![picture](https://imzbf.github.io/md-editor-rt/imgs/preview-light.png)` |
| CTRL + SHIFT + Z | forward | Forward history in editor, not the function of system |
| CTRL + SHIFT + F | Beautify |  |
| CTRL + ALT + C | code row |  |
| CTRL + SHIFT + ALT + T | table | `\|table\|` |

## 🪤 Internal Components

```js
import { NormalToolbar } from 'md-editor-rt';
```

For more examples, refer to [document](https://imzbf.github.io/md-editor-rt).

### 🐣 NormalToolbar

`NormalToolbar`

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `trigger`: `ReactNode`, necessary, it is usually an icon, which is displayed on the toolbar.

- **events**

  - `onClick`: `(e: MouseEvent) => void`, necessary.

### 🐼 DropdownToolbar

`DropdownToolbar`

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `visible`: `boolean`, necessary.
  - `trigger`: `ReactNode`, necessary, it is usually an icon, which is displayed on the toolbar.
  - `overlay`: `ReactNode`, necessary, content of dropdown box.

- **events**

  - `onChange`: `(visible: boolean) => void`, necessary.

### 🦉 ModalToolbar

`ModalToolbar`

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `modalTitle`: `ReactNode`, not necessary, title of the Modal.
  - `visible`: `boolean`, necessary, visibility of Modal.
  - `width`: `string`, not necessary, width of Modal, default `auto`.
  - `height`: `string`, same as `width`.
  - `showAdjust`: `boolean`, not necessary, visibility of fullscreen button.
  - `isFullscreen`: `boolean`, necessary when `showAdjust = true`, status of fullscreen.
  - `trigger`: `ReactNode`, necessary, it is usually an icon, which is displayed on the toolbar.
  - `children`: `ReactNode`, necessary, content of Modal.
  - `className`: `string`, not necessary.
  - `style`: `CSSProperties`, not necessary.
  - `showMask`: `boolean`, not necessary, whether to display the mask layer, default `true`.

- **events**

  - `onClick`: `() => void`, necessary.
  - `onClose`: `() => void`, necessary, closed event.
  - `onAdjust`: `(val: boolean) => void`, fullscreen button was clicked.

### 🐻 MdCatalog

`MdCatalog`

- **props**

  - `editorId`: `string`, necessary, same as editor's `editorId`, used to register listening events.
  - `className`: `string`, not necessary.
  - `mdHeadingId`: `MdHeadingId`, not necessary, same as editor.
  - `scrollElement`: `string | HTMLElement`, not necessary, it is an element selector when its type is string. When `previewOnly` eq `true`, it is usually set to `document.documentElement`.
  - `theme`: `'light' | 'dark'`, not necessary, provide it when you want to change theme online, it is the same as Editor `theme`.
  - `offsetTop`: `number`, not necessary, highlight current item of catalogs when title is `offsetTop` pixels from the top, default 20.
  - `scrollElementOffsetTop`: `number`, not necessary, offsetTop of the scroll container，default 0.
  - `isScrollElementInShadow`: `boolean`, whether the scroll container is in web component, default false.

- **events**

  - `onClick`: `(e: MouseEvent, t: TocItem) => void`, not necessary, heading was clicked.
  - `onActive`: `(heading: HeadList | undefined) => void`, not necessary, heading was highlighted.

### 🛸 MdModal

`MdModal`

- **props**

  - `title`: `ReactNode`, not necessary, title of Modal.
  - `visible`: `boolean`, necessary, visibility of Modal.
  - `width`: `string`, not necessary, width of Modal, default `auto`.
  - `height`: `string`, same as `width`.
  - `showAdjust`: `boolean`, not necessary, visibility of fullscreen button.
  - `isFullscreen`: `boolean`, necessary when `showAdjust = true`, status of fullscreen.
  - `children`: `ReactNode`, necessary, content of Modal.
  - `className`: `string`, not necessary.
  - `style`: `CSSProperties`, not necessary.
  - `showMask`: `boolean`, not necessary, whether to display the mask layer, default `true`.

- **events**

  - `onClose`: `() => void`, necessary, closed event.
  - `onAdjust`: `(val: boolean) => void`, fullscreen button was clicked.

## 🪤 Internal Configuration

```js
import {
  iconfontClassUrl,
  iconfontSvgUrl,
  allToolbar,
  allFooter,
  zh_CN,
  en_US
} from 'md-editor-rt';

console.log(iconfontClassUrl, iconfontSvgUrl, allToolbar, allFooter, zh_CN, en_US);
```

## 🗂 Examples

### 🥹 Upload Picture

> Tips: When you paste and upload GIF, it will upload a static picture. So you should upload it by file system!

```jsx
import React, { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default () => {
  const [text, setText] = useState('# Hello Editor');

  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);

          axios
            .post('/api/img/upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((res) => rev(res))
            .catch((error) => rej(error));
        });
      })
    );

    // Approach 1
    callback(res.map((item) => item.data.url));
    // Approach 2
    // callback(
    //   res.map((item: any) => ({
    //     url: item.data.url,
    //     alt: 'alt',
    //     title: 'title'
    //   }))
    // );
  };

  return <MdEditor modelValue={text} onChange={setText} onUploadImg={onUploadImg} />;
};
```

### 🧙‍♂️ Change Styles

```less
.css-vars(@isDark) {
  --md-color: if(@isDark, #999, #222);
  --md-hover-color: if(@isDark, #bbb, #000);
  --md-bk-color: if(@isDark, #000, #fff);
  --md-bk-color-outstand: if(@isDark, #333, #f2f2f2);
  --md-bk-hover-color: if(@isDark, #1b1a1a, #f5f7fa);
  --md-border-color: if(@isDark, #2d2d2d, #e6e6e6);
  --md-border-hover-color: if(@isDark, #636262, #b9b9b9);
  --md-border-active-color: if(@isDark, #777, #999);
  --md-modal-mask: #00000073;
  --md-modal-shadow: if(@isDark, 0px 6px 24px 2px #00000066, 0px 6px 24px 2px #00000019);
  --md-scrollbar-bg-color: if(@isDark, #0f0f0f, #e2e2e2);
  --md-scrollbar-thumb-color: if(@isDark, #2d2d2d, #0000004d);
  --md-scrollbar-thumb-hover-color: if(@isDark, #3a3a3a, #00000059);
  --md-scrollbar-thumb-active-color: if(@isDark, #3a3a3a, #00000061);
}

.md-editor {
  .css-vars(false);
}

.md-editor-dark {
  .css-vars(true);
}
```

Change background color in dark mode:

```css
.md-editor-dark {
  --md-bk-color: #333 !important;
}
```
