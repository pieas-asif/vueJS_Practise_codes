const Child = {
  template: '#childarea'
};

var app = new Vue({
  el: '#app',
  data() {
    return {
      isShowing: false,
      bkClass: 'bk',
      blurClass: 'blur'
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  },
  components: {
    appChild: Child
  }
});