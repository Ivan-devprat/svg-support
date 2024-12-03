"use strict"

const { createElement, Fragment, useState } = wp.element;
const withSelect = wp.data.withSelect;
const withDispatch = wp.data.withDispatch;

function CheckBoxCustom(props) {
    const [isChecked, setIsChecked] = useState(props.meta.inline_featured_image);
    const {
        meta,
        updateInlineFeaturedSvg,
    } = props;

    return createElement(
        wp.components.CheckboxControl,
        {
            label: "Render this SVG inline (Advanced)",
            checked: isChecked,
            onChange: (value) => {
                setIsChecked(value);
                updateInlineFeaturedSvg(value, meta);
            }
        }
    );
}

const composedCheckBox = wp.compose.compose([
    withState((value) => ({ isChecked: value })),
    withSelect((select) => {
        const currentMeta = select('core/editor').getCurrentPostAttribute('meta');
        const editedMeta = select('core/editor').getEditedPostAttribute('meta');
        return {
            meta: { ...currentMeta, ...editedMeta },
        };
    }),
    withDispatch((dispatch) => ({
        updateInlineFeaturedSvg(value, meta) {
            meta = {
                ...meta,
                inline_featured_image: value,
            };
            dispatch('core/editor').editPost({ meta });
        },
    })),
])(CheckBoxCustom);

function wrapPostFeaturedImage(OriginalComponent) {
    return function(props) {
        return createElement(
            Fragment,
            {},
            '',
            createElement(
                OriginalComponent,
                props
            ),
            createElement(
                composedCheckBox
            )
        );
    }
}

wp.hooks.addFilter(
    'editor.PostFeaturedImage',
    'bodhi-svgs-featured-image/render-inline-image-checkbox',
    wrapPostFeaturedImage
);
