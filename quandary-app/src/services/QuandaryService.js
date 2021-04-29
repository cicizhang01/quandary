import axios from "axios"

export default {
  async getQuandary() {
    let res = await axios.get("http://localhost:8000/quandary");
    return res.data;
  },
  async getQuandarySingle(quandaryId, accessToken) {
    let res = await axios.get("http://localhost:8000/quandary/" + quandaryId, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
    return res.data;
  },
  async getAllHeaderTopics() {
    let res = await axios.get("http://localhost:8000/get_topic_tree_root");
    return res.data;
  },
  async getSubTopics(topicId) {
    let res = await axios.get("http://localhost:8000/get_topic_subtree/" + topicId);
    return res.data;
  }
}
