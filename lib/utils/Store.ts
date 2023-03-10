import {NodeData, Recovery, State, Type} from "../types";
import {EventBus} from "./EventBus";
import {MarkedInputProps} from "../components/MarkedInput";
import {extractOptions} from "./index";
import {EmptyList} from "../constants";
import LinkedListNode from "./LinkedListNode";
import {createRef} from "react";

export class Store {
    #state: State

    focusedNode?: LinkedListNode<NodeData>
    recovery?: Recovery
    containerRef = createRef<HTMLDivElement>()
    overlayRef = createRef<HTMLElement>()

    get state(): State {
        return this.#state;
    }

    static create(props: MarkedInputProps<any>) {
        return () => {
            const {options, ...other} = props

            const initialState = {
                options: extractOptions(options),
                pieces: EmptyList,
                ...other
            } as State

            const bus = EventBus.initWithExternalEvents(props.onContainer)()

            return new Store(initialState, bus)
        }
    }

    constructor(state: State, readonly bus: EventBus) {
        this.#state = state;
    }

    setState(state: Partial<State>) {
        this.#state = {...this.#state, ...state}
        this.bus.send(Type.State, this.#state)
    }
}