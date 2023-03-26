import {RefObject, useCallback} from 'react'
import {SystemEvent} from '../constants'
import {MarkStruct, Trigger} from '../types'
import {Caret} from './Caret'
import {useStore} from './index'
import {useSelector} from './useSelector'

export interface OverlayProps {
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
	onSelect: (value: MarkStruct) => void
	/**
	 * Trigger details
	 */
	trigger: Trigger
	ref: RefObject<HTMLElement>
}

export function useOverlay(): OverlayProps {
	const store = useStore()
	const trigger = useSelector(state => state.trigger!)
	const style = Caret.getAbsolutePosition()

	const onClose = useCallback(() => store.bus.send(SystemEvent.ClearTrigger), [])
	const onSelect = useCallback((value: MarkStruct) => {
		store.bus.send(SystemEvent.Select, {value, trigger})
		store.bus.send(SystemEvent.ClearTrigger)
	}, [trigger])

	return {trigger, style, onSelect, onClose, ref: store.overlayRef}
}