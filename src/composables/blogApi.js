import { ref } from "vue";
import axios from "axios";

export default function useBlogs() {
  const url = "http://vue-test.gingerbd.com/api/";
  const blogs = ref([]);
  const singleBlog = ref([]);
  const error = ref(null);
  const loading = ref(false);
  const statusCode = ref(null);

  // Get All Blogs Data
  const getAllBlogs = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios(url + "blogs");
      blogs.value = res.data.blogs;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  // Get Single Blog Data
  const getSingleBlog = async (id) => {
    singleBlog.value = null;
    error.value = null;
    try {
      const res = await axios(url + "view-blog/" + id);

      singleBlog.value = res.data.blogs;
    } catch (err) {
      error.value = err;
    }
  };

  const postBlog = async (formData) => {
    const post_url = `http://vue-test.gingerbd.com/api/post-comment?blog_id=${formData.blog_id}&comment=${formData.comment}&comment_datetime=${formData.date_time}&user=${formData.name}`;
    error.value = null;
    try {
      const config = {
        method: "POST",
        url: post_url,
      };
      const res = await axios(config);
      statusCode.value = res.status;
    } catch (err) {
      error.value = err;
    }
  };
  const destroyComment = async (commentId) => {
    error.value = null;
    try {
      const res = await axios(url + "remove-comment/" + commentId);

      statusCode.value = res.status;
    } catch (err) {
      error.value = err;
    }
  };

  return {
    statusCode,
    blogs,
    singleBlog,
    error,
    loading,
    getSingleBlog,
    getAllBlogs,
    postBlog,
    destroyComment,
  };
}
