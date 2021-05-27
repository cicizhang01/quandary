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
  async getTopics() {
    let res = await axios.get("http://localhost:8000/get_topic_tree_root");
    return res.data;
  },
  async getSubTopics(topicId) {
    let res = await axios.get("http://localhost:8000/get_topic_subtree/" + topicId);
    return res.data;
  },
  async getDivisions() {
    let res = await axios.get("http://localhost:8000/get_all_divisions");
    return res.data;
  },
  async getFaculty(divisionId) {
    let res = await axios.get("http://localhost:8000/get_faculty_by_division/" + divisionId);
    return res.data;
  },
  async getDepartments() {
    let res = await axios.get("http://localhost:8000/get_all_departments");
    return res.data;
  },
  async getCourses(dept) {
    let res = await axios.get("http://localhost:8000/get_courses_by_dept/" + dept);
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
  async getQuestionTopics(questionId) {
    let res = await axios.get("http://localhost:8000/get_question_topics/" + questionId);
    return res.data;
  },
  async getQuestionIsUpvoted(userId, questionId) {
    let res = await axios.get("http://localhost:8000/is_question_upvoted/" + userId + "/" + questionId);

    // Returns whether or not question is upvoted for a user
    return res.data;
  },
  async getQuestionUpvotes(userId) {
    let res = await axios.get("http://localhost:8000/get_upvoted_questions/" + userId);
    return res.data;
  },
  async getAnswerUpvotes(userId) {
    let res = await axios.get("http://localhost:8000/get_upvoted_answers/" + userId);
    return res.data;
  },
  async addFullUser(userData) {
    await axios.put("http://localhost:8000/add_full_user", userData);
  },
  async addAnswer(userId, questionId, answer) {
    await axios.put("http://localhost:8000/add_answer/" + userId + "/" + questionId, answer);

    // Returns the updated answers for a specific question
    return this.getQuestionAnswers(questionId);
  },
  async updateAnswer(userId, questionId, answerId, answer) {
    await axios.put("http://localhost:8000/update_answer/" + userId + "/" + answerId, answer);

    // Returns the updated answers for a specific question
    return this.getQuestionAnswers(questionId);
  },
  async deleteAnswer(userId, answerId, questionId) {
    await axios.delete("http://localhost:8000/delete_answer/" + userId + "/" + answerId);

    // Returns the updated answers for a specific question
    return this.getQuestionAnswers(questionId);
  },
  async updateQuestionCount(userId, questionId) {
    await axios.put("http://localhost:8000/update_question_upvote/" + questionId + "/" + userId);

    let res = await axios.all([this.getQuestionIsUpvoted(userId, questionId), this.getQuestion(questionId)]);

    // Returns update on whether or not the question is updated for a user and updated question
    return res;
  },
  async updateAnswerCount(userId, answerId, questionId) {
    await axios.put("http://localhost:8000/update_answer_upvote/" + answerId + "/" + userId);

    let res = await axios.all([this.getAnswerUpvotes(userId), this.getQuestionAnswers(questionId)]);

    // Returns the updated upvoted answers for a user and updated answers for a specific question
    return res;
  }
}
