<template>
  <section class="tree-component">
    <ul>
      <TreeNode v-for="element in data" v-bind:key="element.id" :element="element"/>
    </ul>
  </section>
</template>

<script>
import busEvent from '../../busEvent';
import TreeNode from '../TreeNode/TreeNode';

require('@/components/TreeComponent/tree.component.scss');

export default {
  name: 'TreeComponent',
  components: { TreeNode },
  props: {
    data: {}
  },
  methods: {
    handleSelection: function(id) {
      bus.$emit('handleSelection', id)
    }
  },
}

</script>
