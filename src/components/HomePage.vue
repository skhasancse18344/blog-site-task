<script setup>
import useBlogs from "@/composables/blogApi";
import { reactive, onMounted } from "vue";
var temp = null;
const {
  allBlogs,
  getBlogsData,
  postBlog,
  statusCode,
  destroyComment,
  loading,
} = useBlogs();
onMounted(getBlogsData);

function setTemp(id) {
  temp = id;
}
const formData = reactive({
  name: "",
  comment: "",
  blog_id: "",
  date_time: new Date().toJSON().split(".")[0],
});
const onSubmit = async () => {
  // console.log(formData,formData.blog_id =temp);

  //   console.log('Name:', name.value);
  //   console.log('Comment:', comment.value);
  await postBlog(formData, (formData.blog_id = temp));
  if (statusCode.value === 200) {
    formData.name = "";
    formData.comment = "";
    getBlogsData();
  }

  $("#exampleModalCenter").modal("hide");
};

const deleteComment = async (commentId) => {
  if (!window.confirm("Are you sure ?")) {
    return;
  }

  await destroyComment(commentId);

  await getBlogsData();
};
</script>

<template>
  <!-- Loading state -->
  <p
    v-if="loading"
    class="d-flex justify-content-center align-items-center"
    style="min-height: 700px"
  >
    Loading...
  </p>
  <section
    v-for="blg in allBlogs"
    class="resume-section"
    :id="blg.id"
    :key="blg.id"
  >
    <div class="resume-section-content">
      <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
        <div class="flex-grow-1">
          <h3 class="mb-0">{{ blg.title }} {{ blg.id }}</h3>
          <div class="subheading mb-3">{{ blg.created_by }}</div>
          <p v-for="(single, index) in blg.all_blogs" :key="single.id">
            {{ blg.all_blogs[index].blog_detail }}
          </p>
        </div>
        <div
          v-for="(single, index) in blg.all_blogs"
          class="flex-shrink-0"
          :key="single.id"
        >
          <span class="text-primary">{{
            blg.all_blogs[index].blog_datetime
          }}</span>
        </div>
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
        <div class="flex-grow-1">
          <h5 class="mb-0">
            Blog Comment
            <hr />
          </h5>
          <div
            :key="comment.id"
            v-for="comment in blg.all_comments"
            class="subheading mb-1"
            style="font-size: 11pt"
          >
            <i class="fa fa-user"></i> {{ comment.user }}
            <div class="float-right">
              <i class="fa fa-clock"></i> {{ comment.comment_datetime }}
            </div>
            <p>
              {{ comment.comment }}
              <span
                style="cursor: pointer"
                data-toggle="tooltip"
                data-placement="right"
                title="delete this comment"
                @click="deleteComment(comment.id)"
                class="mx-5"
              >
                <i class="fa fa-trash"></i>
              </span>
            </p>
          </div>

          <div class="subheading mb-1">
            <button
              @click="setTemp(blg.id)"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              class="btn btn-sm btn-info"
            >
              New Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Add a Comment</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="exampleFormControlInput1">Name</label>
              <input
                v-model="formData.name"
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="User's name"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Comment</label>
              <textarea
                v-model="formData.comment"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <input
                type="submit"
                class="btn btn-primary"
                value="Post Comment"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
