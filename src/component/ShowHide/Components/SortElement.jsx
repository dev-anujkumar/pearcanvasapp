import React from 'react';
import Sortable from 'react-sortablejs';

function SortElement(props) {

	return (
		<div>
			<Sortable
				options={{
					sort: true,  // sorting inside list
					disabled: props.hasReviewerRole,
					//preventOnFilter: true, // Call event.preventDefault() when triggered filter
					animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
					dragoverBubble: false,
					removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
					fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
					scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
					scrollSpeed: 10,
					handle: '.element-label', //Drag only by element tag name button
					dataIdAttr: 'data-id',
					scroll: true, // or HTMLElement
					filter: ".ignore-for-drag",
					preventOnFilter: false,
					draggable: ".lazyload-wrapper",
					forceFallback: true,
					onStart: function (/**Event*/) {},
					// Element dragging ended
					onUpdate: (/**Event*/evt) => props.onSortUpdate(evt, props.sectionType),
				}}
				ref={(c) => {}}
				tag="div"
				onChange={function (items, sortable, evt) { }}
			>
				{props.children}
			</Sortable>
		</div>
	)
}

export default SortElement;
