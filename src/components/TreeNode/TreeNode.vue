<template>
    <li>
        <label class="element">
            <div @click.prevent="handleClick($event, element.id)">
                <div>
                    <input type="checkbox" :checked="element.selected" />
                    <span class="checkmark"></span>
                    <label>{{ element.name }}</label>
                </div>
                <div class="caret-container" @click.prevent.stop="caretClick">
                    <span v-if="element.children.length > 0" class="caret show-more"></span>
                </div>
            </div>
            <template v-if="element.children.length">
                <ul class="nested">
                    <TreeNode v-for="child in element.children" :key="child.id" :element="child"/>
                </ul>
            </template>
        </label>
    </li>
</template>

<script>
import busEvent from '../../busEvent';
require('@/components/TreeNode/tree.node.scss');

export default {
    name: "TreeNode",
    props: {
        element: {},
    },

    methods: {
        handleClick: function(e, id) {
            busEvent.$emit('handleSelection', id);
        },
        caretClick: (e) => {
            const element = e.target.children[0] ? e.target.children[0] : e.target;
            if (element.classList.contains('show-less')) {
                element.classList.remove('show-less');
                element.parentElement.parentElement.parentElement.children[1].classList.remove('show')
            } else {
                element.classList.add('show-less');
                element.parentElement.parentElement.parentElement.children[1].classList.add('show')
            }
        }
    }
};
</script>
