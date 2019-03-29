app = new Vue({
  el: "#app",
  data() {
    return {
      filterText: '',
      columns: ["title", "year"],
      albumInfo: [
        { title: `Hybrid Theory`, year: 2000 },
        { title:`Meteora`, year: 2003 },
        { title: `Minutes to Midnight`, year: 2007 },
        { title: `A Thousand Suns`, year: 2010 },
        { title: `Living Things`, year: 2012 },
        { title: `The Hunting Party`, year: 2014 },
        { title: `One More Light`, year: 2017 }
      ]
    }
  },
  methods: {
    sortLowest() {
      this.albumInfo.sort((a, b) => a.year > b.year ? 1 : -1);
    },
    sortHighest() {
      this.albumInfo.sort((a, b) => a.year < b.year ? 1 : -1);
    }
  },
  computed: {
    filteredAlbums() {
      let filter = new RegExp(this.filterText, 'i')
      return this.albumInfo.filter(el => el.title.match(filter))
    }
  }
});
