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
  },
  async getLabs() {
    let res = await axios.get("http://localhost:8000/get_all_labs");
    return res.data;
  },
  async getQuestion(questionId) {
    let res = await axios.get("http://localhost:8000/get_question/" + questionId);
    return res.data;
  },
  async getQuestionAnswers(questionId) {
    let res = await axios.get("http://localhost:8000/get_question_answers/" + questionId);
    return res.data;
  },
  async getQuestionsData() {
    let res = await axios.get("http://localhost:8000/get_all_questions");
    return res.data;
  },
  async addAnswer(userId, questionId, answer) {
    await axios.put("http://localhost:8000/add_answer/" + userId + "/" + questionId, answer);

    // Returns the updated answers for a specific question
    return this.getQuestionAnswers(questionId);
  },
  async updateAnswerCount(userId, answerId) {
    await axios.put("http://localhost:8000/update_answer_upvote/" + answerId + "/" + userId);
  }
}
