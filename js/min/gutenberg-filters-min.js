"use strict";function wrapPostFeaturedImage(e){return function(t){return createElement(Fragment,{},"",createElement(e,t),createElement(composedCheckBox))}}function CheckBoxCustom(e){const[t,a]=useState(e.meta.inline_featured_image),{meta:n,updateInlineFeaturedSvg:o}=e;return createElement(wp.components.CheckboxControl,{label:"Render this SVG inline (Advanced)",checked:t,onChange:e=>{a(e),o(e,n)}})}const{createElement:createElement,Fragment:Fragment,useState:useState}=wp.element,withSelect=wp.data.withSelect,withDispatch=wp.data.withDispatch;wp.hooks.addFilter("editor.PostFeaturedImage","bodhi-svgs-featured-image/render-inline-image-checkbox",wrapPostFeaturedImage);const composedCheckBox=wp.compose.compose([withState((e=>{})),withSelect((e=>{const t=undefined,a=undefined;return{meta:{...e("core/editor").getCurrentPostAttribute("meta"),...e("core/editor").getEditedPostAttribute("meta")}}})),withDispatch((e=>({updateInlineFeaturedSvg(t,a){a={...a,inline_featured_image:t},e("core/editor").editPost({meta:a})}})))])(CheckBoxCustom);