<template>
  <div id="app">
    <TreeComponent v-bind:data="dataFromFile"/>
    <div class="tree-container">
      <div class="tree"></div>
    </div>
  </div>
</template>

<script>
import busEvent from './busEvent';
import TreeComponent from './components/TreeComponent/TreeComponent'
import data from './assets/data.json';
import { mapGetters, mapActions } from 'vuex'
require('@/App.scss');

export default {
  name: 'app',
  components: {
    TreeComponent
  },
  data: () => {
    return {
      dataFromFile: {}
    }
  },
  computed: {
    ...mapGetters([
      'selected'
    ])
  },
methods: {
  ...mapActions([
    'filterArray'
  ]),
    convertData(obj) {
      let array = [];
      Object.keys(obj).forEach(x => {
          array[x] = obj[x];
          array[x].selected = false;
          Object.entries(obj[x].children).length === 0 ?
              obj[x].children = [] :
              array[x].children = this.convertData(obj[x].children);
      });
      return array;
    },
    handleSelection(id) {
      const selectWithRecursion = (array, state) => {
        array.map(element => {
          element.selected = state;
          element.children.length > 0 && selectWithRecursion(element.children, state);
        });
      }

      const findElementInArray = (data) => {
        data.map(element => {
          if (element.id === id) {
            element.selected = !element.selected;
            element.children && selectWithRecursion(element.children, element.selected);
            } else {
              findElementInArray(element.children)
            }
          });
        };
      
      findElementInArray(this.dataFromFile);

      this.$store.dispatch('filterArray', this.dataFromFile);
    }
  },
  mounted() {
    this.dataFromFile = this.$store.getters.getList.length > 0 ? this.$store.getters.getList : this.convertData(data);
    busEvent.$on('handleSelection', id => this.handleSelection(id));
  }
}

</script>
