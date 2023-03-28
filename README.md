# [Marked Input](https://marked-input.vercel.app) &middot; [![npm version](https://img.shields.io/npm/v/rc-marked-input.svg?style=flat)](https://www.npmjs.com/package/rc-marked-input) [![min zipped size](https://img.shields.io/bundlephobia/minzip/rc-marked-input)](https://bundlephobia.com/package/rc-marked-input) [![Storybook](https://gw.alipayobjects.com/mdn/ob_info/afts/img/A*CQXNTZfK1vwAAAAAAAAAAABjAQAAAQ/original)](https://marked-input.vercel.app)

<img width="521" alt="image" src="https://user-images.githubusercontent.com/37639183/182974441-49e4b247-449a-47ba-a090-2cb3aab7ce44.png">

A React component that lets you combine editable text with any component using annotated text.

> **Note:** This page is for the **next** version. The latest release can be found [here](https://github.com/Nowely/marked-input/releases/latest).

## Feature

* Powerful annotations tool: add, edit, remove, visualize 
* TypeScript
* Support for any components
* Flexible and customizable
* Two ways to configure
* Helpers for processing text
* Hooks for advanced components
* Button handling (Left, Right, Delete, Backspace, Esc)
* Overlay with the suggestions component by default
* Zero dependencies

## Installation

You can install the package via npm:

```
npm install rc-marked-input
```

## Usage

There are many examples available in the [Storybook](https://marked-input.vercel.app). You can also try a template
on [CodeSandbox](https://codesandbox.io/s/configured-marked-input-dnvuv9?file=/src/App.tsx). 

Here are a few examples to get you started:

### Static marks &middot; [![sandbox](https://user-images.githubusercontent.com/37639183/199624889-6129e303-6b44-4b82-859d-ada79942842c.svg)](https://codesandbox.io/s/marked-input-ywnplp?file=/src/App.tsx)

```javascript
import {MarkedInput} from "rc-marked-input";

const Mark = (props) => <mark onClick={_ => alert(props.value)}>{props.label}</mark>

const Marked = () => {
    const [value, setValue] = useState("Hello, clickable marked @[world](Hello! Hello!)!")
    return <MarkedInput Mark={Mark} value={value} onChange={setValue}/>
}
```

#### Configured &middot; [![sandbox](https://user-images.githubusercontent.com/37639183/199624889-6129e303-6b44-4b82-859d-ada79942842c.svg)](https://codesandbox.io/s/configured-marked-input-dnvuv9?file=/src/App.tsx)

The library allows you to configure the `MarkedInput` component in two ways.

Let's declare markups and suggestions data:

```tsx
const Data = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"]
const AnotherData = ["Seventh", "Eight", "Ninth"]
const Primary = "@[__label__](primary:__value__)"
const Default = "@[__label__](default)"
```

Using the components

```tsx
import {MarkedInput} from "rc-marked-input";

export const App = () => {
    const [value, setValue] = useState(
        "Enter the '@' for creating @[Primary Mark](primary:Hello!) or '/' for @[Default mark](default)!"
    )

    return (
        <MarkedInput Mark={Button} value={value} onChange={setValue} options={[{
            markup: Primary,
            data: Data,
            initMark: ({label, value}) => ({label, primary: true, onClick: () => alert(value)})
        }, {
            trigger: '/',
            markup: Default,
            data: AnotherData
        }]}/>
    )
}
```

Using the `createMarkedInput`:

```tsx
import {createMarkedInput} from "rc-marked-input";

const ConfiguredMarkedInput = createMarkedInput({
    Mark: Button,
    options: [{
        markup: Primary,
        data: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'],
        initMark: ({label, value}) => ({label, primary: true, onClick: () => alert(value)})
    }, {
        markup: Default,
        trigger: '/',
        data: ['Seventh', 'Eight', 'Ninth'],
        initMark: ({label}) => ({label})
    }],
})

const App = () => {
    const [value, setValue] = useState(
        "Enter the '@' for creating @[Primary Mark](primary:Hello!) or '/' for @[Default mark](default)!"
    )
    return <ConfiguredMarkedInput value={value} onChange={setValue}/>
}
```

### Dynamic mark &middot; [![sandbox](https://user-images.githubusercontent.com/37639183/199624889-6129e303-6b44-4b82-859d-ada79942842c.svg)](https://codesandbox.io/s/dynamic-mark-m5uv58?file=/src/App.js)

Marks can be dynamic: editable, removable, etc. via the `useMark` hook helper.

#### Editable

```tsx
import {MarkedInput, useMark} from "rc-marked-input";

const Mark = () => {
    const {label, ochange} = useMark()

    const handleInput = (e) =>
        change({label: e.currentTarget.textContent ?? "", value: " "}, {silent: true})

    return <mark contentEditable onInput={handleInput} children={label}/>
}

export const Dynamic = () => {
    const [value, setValue] = useState("Hello, dynamical mark @[world]( )!")
    return <MarkedInput Mark={Mark} value={value} onChange={setValue}/>
}
```

> **Note:** The silent option used to prevent re-rendering itself.

#### Removable

```tsx
const RemovableMark = () => {
    const {label, remove} = useMark()
    return <mark onClick={remove} children={label}/>
}

export const Removable = () => {
    const [value, setValue] = useState("I @[contain]( ) @[removable]( ) by click @[marks]( )!")
    return <MarkedInput Mark={RemovableMark} value={value} onChange={setValue}/>
}
```

#### Focusable

If passed the `ref` prop of the `useMark` hook in ref of a component then it component can be focused by key operations.

### Overlay

A default overlay is the suggestion component, but it can be easily replaced for any other.

#### Suggestions

```tsx
export const DefaultOverlay = () => {
    const [value, setValue] = useState("Hello, default - suggestion overlay by trigger @!")
    return <MarkedInput Mark={Mark} value={value} onChange={setValue} options={[{data:['First', 'Second', 'Third']}]}/>
}
```

#### Custom overlay &middot; [![sandbox](https://user-images.githubusercontent.com/37639183/199624889-6129e303-6b44-4b82-859d-ada79942842c.svg)](https://codesandbox.io/s/custom-overlay-8c8e2r?file=/src/App.tsx)

```tsx
const Overlay = () => <h1>I am the overlay</h1>
export const CustomOverlay = () => {
    const [value, setValue] = useState("Hello, custom overlay by trigger @!")
    return <MarkedInput Mark={Mark} Overlay={Overlay} value={value} onChange={setValue}/>
}
```

#### Custom trigger

```tsx
export const CustomTrigger = () => {
    const [value, setValue] = useState("Hello, custom overlay by trigger /!")
    return <MarkedInput Mark={() => null} Overlay={Overlay} value={value} onChange={setValue} options={[{trigger: '/'}]}/>
}
```

#### Positioned

The `OverlayProps` has a left and right absolute coordinate of a current caret position in the `style` prop.

```tsx
const Tooltip = () => {
    const {style} = useOverlay()
    return <div style={{position: 'absolute', ...style}}>I am the overlay</div>;
}
export const PositionedOverlay = () => {
    const [value, setValue] = useState("Hello, positioned overlay by trigger @!")
    return <MarkedInput Mark={Mark} Overlay={Tooltip} value={value} onChange={setValue}/>
}
```

#### Selectable

The `OverlayProps` provide some methods like `onSelect` for creating a new annotation.

```tsx
const List = () => {
    const {onSelect} = useOverlay()
    return <ul>
        <li onClick={() => onSelect({label: 'First'})}>Clickable First</li>
        <li onClick={() => onSelect({label: 'Second'})}>Clickable Second</li>
    </ul>;
}

export const SelectableOverlay = () => {
    const [value, setValue] = useState("Hello, suggest overlay by trigger @!")
    return <MarkedInput Mark={Mark} Overlay={List} value={value} onChange={setValue}/>
}
```

> **Note:** Recommend to use the `React.forwardRef` for an overlay component. It used to detect outside click.

### Overriding internal components

The `children` prop allows to pass elements to overrides internal components.
The `div` tag for container. The `span` tag for text cell.

```tsx
<ConfiguredMarkedInput value={value} onChange={setValue}>
    <div
        onClick = {(e) => console.log('onCLick')}
        onInput = {(e) => console.log('onInput')}
        /* other props */
        onBlur = {(e) => console.log('onBlur')}
        onFocus = {(e) => console.log('onFocus')}
        onKeyDown={(e) => console.log('onKeyDown')}
    />
    <span className='span-class'/>
</>
```

### Overall view

```tsx
<MarkedInput Mark={Mark} Overlay={Overlay} value={value} onChange={setValue}> option={[{
    trigger: '@',
    markup: '@[__label__](__value__)',
    data: Data,
    initMark: getCustomMarkProps,
}, {
    trigger: '/',
    markup: '@(__label__)[__value__]',
    data: AnotherData,
    initMark: getAnotherCustomMarkProps,
}]}/>
```

Or

```tsx
const MarkedInput = createMarkedInput({Mark, Overlay, options: [{
    trigger: '@',
    markup: '@[__label__](__value__)',
    data: Data,
    initMark: getCustomMarkProps,
}, {
    trigger: '/',
    markup: '@(__label__)[__value__]',
    data: AnotherData,
    initMark: getAnotherCustomMarkProps,
}]})

const App = () => <MarkedInput value={value} onChange={setValue}/>
```

## API

### MarkedInput

| Name        | Type                         | Default       | Description                                |
|-------------|------------------------------|---------------|--------------------------------------------|
| value       | string                       |               | Annotated text with markups for mark       |
| onChange    | (value: string) => void      |               | Change event                               |
| Mark        | ComponentType<T = MarkProps> |               | Component that used for render markups     |
| Overlay     | ComponentType                | `Suggestions` | Component that is rendered by trigger      |
| readOnly    | boolean                      | `undefined`   | Prevents from changing the value           |
| options     | OptionProps[]                | `[{}]`        | Passed options for configure               |

### Helpers

| Name              | Type                                                                              | Description                                  |
|-------------------|-----------------------------------------------------------------------------------|----------------------------------------------|
| createMarkedInput | <T = MarkStruct>(configs: MarkedInputProps<T>): ConfiguredMarkedInput<T>          | Create the configured MarkedInput component. |
| annotate          | (markup: Markup, label: string, value?: string) => string                         | Make annotation from the markup              |
| denote            | (value: string, callback: (mark: Mark) => string, ...markups: Markup[]) => string | Transform the annotated text                 |
| useMark           | () => DynamicMark                                                                 | Allow to use dynamic mark                    |
| useOverlay        | () => OverlayProps                                                                | Use overlay props                            |
| useListener       | (type, listener, deps) => void                                                    | Event listener                               |

### Types

```typescript
interface MarkStruct {
    label: string
    value?: string
}
```

```typescript
interface OverlayProps {
    /**
     * Style with caret absolute position. Used for placing an overlay.
     */
    style: {
        left: number
        top: number
    }
    /**
     * Used for close overlay.
     */
    onClose: () => void
    /**
     * Used for insert an annotation instead a triggered value.
     */
    onSelect: (value: MarkProps) => void
    /**
     * Trigger details
     */
    trigger: Trigger
}
```

```typescript
type Trigger = {
    /**
     * Found value via a trigger
     */
    value: string,
    /**
     * Triggered value
     */
    source: string,
    /**
     * Piece of text, in which was a trigger
     */
    span: string,
    /**
     * Html element, in which was a trigger
     */
    node: Node,
    /**
     * Start position of a trigger
     */
    index: number,
    /**
     * Trigger's option
     */
    option: OptionType
}
```

```typescript jsx
export interface OptionProps<T = Record<string, any>> {
    /**
     * Template string instead of which the mark is rendered.
     * Must contain placeholders: `__label__` and optional `__value__`
     * @Default "@[__label__](__value__)"
     */
    markup?: Markup
    /**
     * Sequence of symbols for calling the overlay.
     * @Default "@"
     */
    trigger?: string
    /**
     * Data for an overlay component. By default, it is suggestions.
     */
    data?: string[] 
    /**
     * Function to initialize props for the mark component. Gets arguments from found markup
     */
    initMark?: (props: MarkProps) => T
}
```

## Contributing

If you want to contribute, you are welcome! Create an issue or start a discussion. 
