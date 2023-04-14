export default {
    data() {
      return {
        text: "这是一段非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的文字。",
        maxLength: 20,
      };
    },
    computed: {
      truncatedText() {
        if (this.text.length > this.maxLength) {
          return this.text.substring(0, this.maxLength) + "...";
        } else {
          return this.text;
        }
      },
    },
  };