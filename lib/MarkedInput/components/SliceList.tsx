import {isObject, useStore} from "../utils";
import {EditableSpan} from "./EditableSpan";
import {DefaultClass} from "../constants";
import {useFocus} from "../hooks/useFocus";

export const SliceList = () => {
    const {sliceMap, configs, props: {Mark, ...props}, trigger: {check, clear}} = useStore()
    const {register, ...focusHandles} = useFocus(check, clear)
    const className = props.className ? DefaultClass + " " + props.className : DefaultClass

    //TODO передавать вместе со словом реф. Точнее передавать два аргумента: объект с словом и реф
    return (
        <div className={className} style={props.style} {...focusHandles}>
            {[...sliceMap].map(([key, slice]) => (
                    isObject(slice)
                        ? <Mark key={key} tabIndex={-1}
                                {...configs[slice.childIndex].initializer(slice.value, slice.id)} />
                        : <EditableSpan
                            ref={register(key)}
                            id={key} key={key} value={slice}/>
                )
            )}
        </div>
    )
}